import {MeetingExcludedDate} from "@/drizzle/schema/meeting_excluded_dates";

export interface IMeetingExcludedDatesRepository {
    getMultipleMeetingsExcludedDatesForDate(meetingIds: string[], startDate: number, timezoneOffsetMin: number): Promise<MeetingExcludedDate[]>
    getMeetingExcludedDates(meetingId: string): Promise<MeetingExcludedDate[]>
}