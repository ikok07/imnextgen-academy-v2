import {
    UserSpecificMeeting,
    UserSpecificMeetingInsert,
    userSpecificMeetingTypeSchema
} from "@/drizzle/schema/user_specific_meetings";
import {z} from "zod";

const getSpecificMeetingsGenericOptionsSchema = z.object({
    timezoneOffsetMin: z.number(),
    startDate: z.number().optional(),
    meetingType: userSpecificMeetingTypeSchema
});

export const getSpecificMeetingsByUserIdOptionsSchema = z.object({
    userId: z.string(),
}).and(getSpecificMeetingsGenericOptionsSchema);

export const getSpecificMeetingsByMentorProfileIdOptionsSchema = z.object({
    userId: z.string(),
    mentorProfileId: z.string()
}).and(getSpecificMeetingsGenericOptionsSchema);

export type GetSpecificMeetingsByUserIdOptions = z.infer<typeof getSpecificMeetingsByUserIdOptionsSchema>;
export type GetSpecificMeetingsByMentorProfileIdOptions = z.infer<typeof getSpecificMeetingsByMentorProfileIdOptionsSchema>;

export interface IUserSpecificMeetingsRepository {
    getSpecificMeetingsByUserId(opts: GetSpecificMeetingsByUserIdOptions): Promise<UserSpecificMeeting[]>;
    getSpecificMeetingsByMentorId(opts: GetSpecificMeetingsByMentorProfileIdOptions): Promise<UserSpecificMeeting[]>;
    addUserSpecificMeeting(data: UserSpecificMeetingInsert): Promise<UserSpecificMeeting>;
    updateUserSpecificMeeting(data: UserSpecificMeetingInsert): Promise<UserSpecificMeeting>;
    removeUserSpecificMeeting(id: string): Promise<void>;
}