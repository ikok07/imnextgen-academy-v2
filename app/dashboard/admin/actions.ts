"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";
import {
    CreateCalendarEventOptions, DeleteCalendarEventOptions,
    GetCalendarEventsOptions
} from "@/src/application/services/calendar/calendar.service.interface";
import {UserSpecificMeeting} from "@/drizzle/schema/user_specific_meetings";
import {minutesToMilliseconds} from "date-fns";

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

export const bookSalesMeeting = createServerAction(async (userId: string | undefined, mentorId: string | undefined, calendarEventOpts: Partial<Omit<CreateCalendarEventOptions, "calendarId">>) => {
    const event = await getInjection("ICreateCalendarEventController")(mentorId, calendarEventOpts);
    try {
        const {meeting_url} = await getInjection("IGetCalendarIdByUserIdController")(mentorId);
        await getInjection("IAddUserSpecificMeetingController")({
            profile_id: userId,
            mentor_profile_id: mentorId,
            platform: "zoom",
            date: calendarEventOpts.event?.start?.dateTime ? Math.floor(new Date(calendarEventOpts.event?.start?.dateTime).valueOf() / 1000) : undefined,
            duration_minutes: 30,
            type: "sales-meeting",
            url: meeting_url
        })
    } catch (e) {
        await getInjection("IDeleteCalendarEventController")(mentorId, {eventId: event.id})
        throw e;
    }
});

export const unbookSalesMeeting = createServerAction(async (salesMeeting: UserSpecificMeeting, mentorId: string | undefined) => {
    const calendarEvents = await getInjection("IGetCalendarEventsController")(mentorId, {
        timeMin: salesMeeting.date * 1000,
        timeMax: salesMeeting.date * 1000 + minutesToMilliseconds(salesMeeting.duration_minutes + 1)
    });
    const validCalendarEvent = calendarEvents.find(event => event.start === salesMeeting.date * 1000);

    if (validCalendarEvent) await getInjection("IDeleteCalendarEventController")(mentorId, {eventId: validCalendarEvent.id});
    await getInjection("IRemoveUserSpecificMeetingController")(salesMeeting.id, mentorId);
})

