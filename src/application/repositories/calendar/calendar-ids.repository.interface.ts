import {UserCalendarId} from "@/drizzle/schema/user_calendar_ids";

export interface ICalendarIdsRepository {
    getCalendarIdByUserId(userId: string): Promise<UserCalendarId>;
}