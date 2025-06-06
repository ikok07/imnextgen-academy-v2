import {UserSpecificMeeting, UserSpecificMeetingInsert} from "@/drizzle/schema/user_specific_meetings";

export interface IUserSpecificMeetingsRepository {
    getSpecificMeetingsByUserId(userId: string, timezoneOffsetMin: number, startDate?: number): Promise<UserSpecificMeeting[]>;
    addUserSpecificMeeting(data: UserSpecificMeetingInsert): Promise<UserSpecificMeeting>;
    updateUserSpecificMeeting(data: UserSpecificMeetingInsert): Promise<UserSpecificMeeting>;
    removeUserSpecificMeeting(id: string): Promise<void>;
}