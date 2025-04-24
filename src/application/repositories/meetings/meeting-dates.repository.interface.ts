import {MeetingDate} from "@/drizzle/schema/meeting_dates";

export interface IMeetingDatesRepository {
    getMeetingDates(meetingId: string): Promise<MeetingDate[]>
    getMeetingDatesByStartDate(startDate: number): Promise<MeetingDate[]>
}