"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";
import {
    CreateCalendarEventOptions, DeleteCalendarEventOptions,
    GetCalendarEventsOptions
} from "@/src/application/services/calendar/calendar.service.interface";

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

export const bookSalesMeeting = createServerAction(async (userId: string | undefined, mentorId: string | undefined, opts: Partial<Omit<CreateCalendarEventOptions, "calendarId">>) => {
    const event = await getInjection("ICreateCalendarEventController")(mentorId, opts);
    try {
        await getInjection("IAddUserSpecificMeetingController")({
            profile_id: userId,
            mentor_profile_id: mentorId,
            platform: "zoom",
            date: opts.event?.start?.dateTime ? Math.floor(new Date(opts.event?.start?.dateTime).valueOf() / 1000) : undefined,
            duration_minutes: 30,
            type: "sales-meeting",
            url: "https://google.com"
        })
    } catch (e) {
        await getInjection("IDeleteCalendarEventController")(mentorId, {eventId: event.id})
        throw e;
    }
});

export const unbookSalesMeeting = createServerAction(async (specificMeetingId: string | undefined, mentorId: string | undefined, calendarEventOpts: Partial<Omit<DeleteCalendarEventOptions, "calendarId">>) => {
    if (calendarEventOpts.eventId) await getInjection("IDeleteCalendarEventController")(mentorId, calendarEventOpts);
    await getInjection("IRemoveUserSpecificMeetingController")(specificMeetingId, mentorId);
})

