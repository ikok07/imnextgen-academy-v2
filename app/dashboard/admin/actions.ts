"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";
import {
    CreateCalendarEventOptions,
    GetCalendarEventsOptions
} from "@/src/application/services/calendar/calendar.service.interface";
import {UserSpecificMeeting} from "@/drizzle/schema/user_specific_meetings";
import {FullProfile} from "@/src/entities/models/auth/full-profile";

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
    await getInjection("IBookSalesMeetingController")({
        selectedTime,
        selectedDuration,
        mentorId,
        fullProfile
    });
});

export const unbookSalesMeeting = createServerAction(async (salesMeeting: UserSpecificMeeting | undefined) => {
    await getInjection("IUnbookSalesMeetingController")(salesMeeting);
});

export const getVideoProgressForSection = createServerAction((userId: string | undefined, sectionId: string | undefined) => {
    return getInjection("IGetVideoProgressesForSectionController")(userId, sectionId);
});

