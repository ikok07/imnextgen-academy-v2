import {
    UserSpecificMeeting,
    UserSpecificMeetingInsert,
    userSpecificMeetingTypeSchema
} from "@/drizzle/schema/user_specific_meetings";
import {z} from "zod";

export const getSpecificMeetingsByUserIdOptionsSchema = z.object({
    userId: z.string(),
    timezoneOffsetMin: z.number(),
    startDate: z.number().optional(),
    meetingType: userSpecificMeetingTypeSchema
});

export type GetSpecificMeetingsByUserIdOptions = z.infer<typeof getSpecificMeetingsByUserIdOptionsSchema>;

export interface IUserSpecificMeetingsRepository {
    getSpecificMeetingsByUserId(opts: GetSpecificMeetingsByUserIdOptions): Promise<UserSpecificMeeting[]>;
    addUserSpecificMeeting(data: UserSpecificMeetingInsert): Promise<UserSpecificMeeting>;
    updateUserSpecificMeeting(data: UserSpecificMeetingInsert): Promise<UserSpecificMeeting>;
    removeUserSpecificMeeting(id: string): Promise<void>;
}