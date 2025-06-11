import {minutesToMilliseconds} from "date-fns";
import {UserSpecificMeeting, userSpecificMeetingSchema} from "@/drizzle/schema/user_specific_meetings";
import {InputParseError} from "@/src/entities/errors/common";
import {
    IGetCalendarEventsController
} from "@/src/interface-adapters/controllers/calendar/get-calendar-events.controller";
import {
    IDeleteCalendarEventController
} from "@/src/interface-adapters/controllers/calendar/delete-calendar-event.controller";
import {
    IRemoveUserSpecificMeetingController
} from "@/src/interface-adapters/controllers/meetings/user-specific-meeings/remove-user-specific-meeting.controller";

export type IUnbookSalesMeetingController = ReturnType<typeof unbookSalesMeetingController>;

export const unbookSalesMeetingController = (
    getCalendarEventsController: IGetCalendarEventsController,
    deleteCalendarEventController: IDeleteCalendarEventController,
    removeUserSpecificMeetingController: IRemoveUserSpecificMeetingController
) => async (salesMeeting: Partial<UserSpecificMeeting> | undefined) => {
    const {data: parsedSalesMeeting, error} = userSpecificMeetingSchema.safeParse(salesMeeting);
    if (error) throw new InputParseError(`Invalid sales meeting! ${error}`);

    const calendarEvents = await getCalendarEventsController(parsedSalesMeeting.mentor_profile_id ?? undefined, {
        timeMin: parsedSalesMeeting.date * 1000,
        timeMax: parsedSalesMeeting.date * 1000 + minutesToMilliseconds(parsedSalesMeeting.duration_minutes + 1)
    });
    const validCalendarEvent = calendarEvents.find(event => event.start === parsedSalesMeeting.date * 1000);

    if (validCalendarEvent) await deleteCalendarEventController(parsedSalesMeeting.mentor_profile_id ?? undefined, {eventId: validCalendarEvent.id});
    await removeUserSpecificMeetingController(parsedSalesMeeting.id, parsedSalesMeeting.mentor_profile_id ?? undefined);
}