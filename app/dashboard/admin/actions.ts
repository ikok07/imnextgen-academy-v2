"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";
import {
    CreateCalendarEventOptions,
    GetCalendarEventsOptions
} from "@/src/application/services/calendar/calendar.service.interface";
import {UserSpecificMeeting} from "@/drizzle/schema/user_specific_meetings";
import {millisecondsToMinutes, minutesToMilliseconds} from "date-fns";
import {FullProfile} from "@/src/entities/models/auth/full-profile";
import {formatInTimeZone} from "date-fns-tz";

export const deleteUser = createServerAction(async (userId: string | undefined) => {
    await getInjection("IDeleteUserController")(userId);
});

export const deleteMultipleUsers = createServerAction(async (userIds: (string | undefined)[]) => {
    await getInjection("IDeleteMultipleUsersController")(userIds);
});

export const getMentorSchedules = createServerAction((userId: string | undefined) => {
    return getInjection("IGetMentorSchedulesController")(userId);
});

export const getCalendarEvents = createServerAction((userId: string | undefined, opts: Partial<Omit<GetCalendarEventsOptions, "calendarId">>) => {
    return getInjection("IGetCalendarEventsController")(userId, opts);
});

export const createCalendarEvent = createServerAction((userId: string | undefined, opts: Partial<Omit<CreateCalendarEventOptions, "calendarId">>) => {
    return getInjection("ICreateCalendarEventController")(userId, opts);
});

export const bookSalesMeeting = createServerAction(async (fullProfile: FullProfile, mentorId: string, selectedTime: number | undefined, selectedDuration: number) => {
    if (!selectedTime) return;

    const setupQuestions = await getInjection("IGetUserSetupQuestionsController")(fullProfile.id);

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
    const event = await getInjection("ICreateCalendarEventController")(mentorId, calendarEventOpts);
    try {
        const {meeting_url} = await getInjection("IGetCalendarIdByUserIdController")(mentorId);
        const startDate = calendarEventOpts.event?.start?.dateTime;
        const endDate = calendarEventOpts.event?.end?.dateTime;

        await getInjection("IAddUserSpecificMeetingController")({
            profile_id: fullProfile.id,
            mentor_profile_id: mentorId,
            platform: "zoom",
            date: startDate  ? Math.floor(new Date(startDate).valueOf() / 1000) : undefined,
            duration_minutes: !!startDate && !!endDate ? millisecondsToMinutes(new Date(endDate).valueOf() - new Date(startDate).valueOf()) : 30,
            type: "sales-meeting",
            url: meeting_url
        })
    } catch (e) {
        await getInjection("IDeleteCalendarEventController")(mentorId, {eventId: event.id})
        throw e;
    }
});

export const unbookSalesMeeting = createServerAction(async (salesMeeting: UserSpecificMeeting) => {
    const calendarEvents = await getInjection("IGetCalendarEventsController")(salesMeeting.mentor_profile_id ?? undefined, {
        timeMin: salesMeeting.date * 1000,
        timeMax: salesMeeting.date * 1000 + minutesToMilliseconds(salesMeeting.duration_minutes + 1)
    });
    const validCalendarEvent = calendarEvents.find(event => event.start === salesMeeting.date * 1000);

    if (validCalendarEvent) await getInjection("IDeleteCalendarEventController")(salesMeeting.mentor_profile_id ?? undefined, {eventId: validCalendarEvent.id});
    await getInjection("IRemoveUserSpecificMeetingController")(salesMeeting.id, salesMeeting.mentor_profile_id ?? undefined);
})

