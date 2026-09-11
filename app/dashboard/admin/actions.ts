"use server"

import {createServerAction, ServerActionError} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";
import {
    CreateCalendarEventOptions,
    GetCalendarEventsOptions
} from "@/src/application/services/calendar/calendar.service.interface";
import {UserSpecificMeeting} from "@/drizzle/schema/user_specific_meetings";
import {FullProfile} from "@/src/entities/models/auth/full-profile";
import {TaskSubmissionStatus} from "@/drizzle/schema/task_submissions";
import {UserRoleType} from "@/drizzle/schema/user_roles";

const REVIEWER_ROLES: UserRoleType[] = ["admin", "moderator", "mentor"];

/** Преглед на предадени задачи е позволен само на екипа, не на курсистите. */
async function assertCanReviewSubmissions() {
    const {dbProfile} = await getInjection("IGetUserController")();
    if (!dbProfile || !dbProfile.roles.some(role => REVIEWER_ROLES.includes(role))) {
        throw new ServerActionError({id: "forbidden", message: "Нямаш достъп до предадените задачи!"});
    }
    return dbProfile.id;
}

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


export const getTaskSubmissionsForReview = createServerAction(async (opts?: {status?: TaskSubmissionStatus, moduleId?: string, limit?: number}) => {
    await assertCanReviewSubmissions();
    return getInjection("IGetSubmissionsForReviewController")(opts);
});

export const reviewTaskSubmission = createServerAction(async (opts: {submissionId?: string, status?: "approved" | "changes_requested", feedback?: string}) => {
    const reviewerId = await assertCanReviewSubmissions();
    return getInjection("IReviewSubmissionController")({...opts, reviewerId});
});
