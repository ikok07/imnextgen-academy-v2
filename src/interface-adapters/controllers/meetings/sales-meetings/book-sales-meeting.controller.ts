import {CreateCalendarEventOptions} from "@/src/application/services/calendar/calendar.service.interface";
import {formatInTimeZone} from "date-fns-tz";
import {millisecondsToMinutes, minutesToMilliseconds} from "date-fns";
import {z} from "zod";
import {fullProfileSchema} from "@/src/entities/models/auth/full-profile";
import {InputParseError} from "@/src/entities/errors/common";
import {
    IGetUserSetupQuestionsController
} from "@/src/interface-adapters/controllers/setup/get-user-setup-questions.controller";
import {
    ICreateCalendarEventController
} from "@/src/interface-adapters/controllers/calendar/create-calendar-event.controller";
import {
    IGetCalendarIdByUserIdController
} from "@/src/interface-adapters/controllers/calendar/calendar-ids/get-calendar-id-by-user-id.controller";
import { IAddUserSpecificMeetingController } from "../user-specific-meeings/add-user-specific-meeting.controller";
import {
    IDeleteCalendarEventController
} from "@/src/interface-adapters/controllers/calendar/delete-calendar-event.controller";
import {
    IStartSalesMeetingAutomationController
} from "@/src/interface-adapters/controllers/automations/start-sales-meeting-automation.controller";

export type IBookSalesMeetingController = ReturnType<typeof bookSalesMeetingController>;

export const bookSalesMeetingOptionsSchema = z.object({
    selectedTime: z.number(),
    selectedDuration: z.number(),
    mentorId: z.string(),
    fullProfile: fullProfileSchema
});

export type BookSalesMeetingOptions = z.infer<typeof bookSalesMeetingOptionsSchema>;

export const bookSalesMeetingController = (
    getUserSetupQuestionsController: IGetUserSetupQuestionsController,
    createCalendarEventController: ICreateCalendarEventController,
    getCalendarIdByUserIdController: IGetCalendarIdByUserIdController,
    addUserSpecificMeetingController: IAddUserSpecificMeetingController,
    deleteCalendarEventController: IDeleteCalendarEventController,
    startSalesMeetingAutomationController: IStartSalesMeetingAutomationController
) => async (opts: Partial<BookSalesMeetingOptions>) => {

    const {data: parsedOptions, error} = bookSalesMeetingOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    const {selectedTime, selectedDuration, mentorId, fullProfile} = parsedOptions;

    if (!selectedTime) return;

    const setupQuestions = await getUserSetupQuestionsController(fullProfile.id);

    const calendarEventOpts: Partial<Omit<CreateCalendarEventOptions, "calendarId">> = {
        event: {
            summary: `Sales среща с ${fullProfile.name}`,
            description: `Име: ${fullProfile.name}\nИмейл: ${fullProfile.email}\nТелефон: ${fullProfile.phone}\n${setupQuestions.map(q => `${q.question} - ${q.answer}`).join('\n')}`,
            start: {
                dateTime: formatInTimeZone(selectedTime, "Europe/Sofia", "yyyy-MM-dd'T'HH:mm:ssxxx")
            },
            end: {
                dateTime: formatInTimeZone(selectedTime + minutesToMilliseconds(selectedDuration), "Europe/Sofia", "yyyy-MM-dd'T'HH:mm:ssxxx")
            }
        },
        enableWatch: true
    }
    const event = await createCalendarEventController(mentorId, calendarEventOpts);

    const startDate = calendarEventOpts.event?.start?.dateTime;
    const startTimestamp = startDate ? Math.floor(new Date(startDate).valueOf() / 1000) : undefined;

    const endDate = calendarEventOpts.event?.end?.dateTime;

    let meetingUrl: string | undefined;
    try {
        const {meeting_url} = await getCalendarIdByUserIdController(mentorId);
        meetingUrl = meeting_url;
        await addUserSpecificMeetingController({
            title: "Среща с ментор",
            description: "Нека обсъдим пътя ти в академията към кариера в ИТ сферата",
            image_url: "/api/v1/assets?bucket=academy-v2&path=sales_meeting.jpg",
            access: "free",
            profile_id: fullProfile.id,
            mentor_profile_id: mentorId,
            platform: "zoom",
            date: startTimestamp,
            duration_minutes: !!startDate && !!endDate ? millisecondsToMinutes(new Date(endDate).valueOf() - new Date(startDate).valueOf()) : 30,
            type: "sales-meeting",
            url: meeting_url
        })
    } catch (e) {
        await deleteCalendarEventController(mentorId, {eventId: event.id})
        throw e;
    }

    if (process.env.NODE_ENV === "production") {
        try {
            await startSalesMeetingAutomationController({
                backendUrl: process.env.NEXT_PUBLIC_BASE_URL,
                userId: fullProfile.id,
                firstName: fullProfile.name.split(' ')[0],
                email: fullProfile.email,
                hour: startTimestamp ? formatInTimeZone(startTimestamp, "Europe/Sofia", "HH:mm") : "",
                date: startTimestamp ? formatInTimeZone(startTimestamp, "Europe/Sofia", "dd.MM.yyyy") : "",
                meetingUrl,
                meetingStartDateSeconds: startTimestamp
            });
        } catch (e) {
            console.error(`Failed to start sales meeting automation! ${e}`);
        }
    }
}