import {MeetingRepeatDay} from "@/drizzle/schema/meeting_repeat_days";

export interface IMeetingRepeatDaysRepository {
    getMeetingRepeatDays(meetingId: string): Promise<MeetingRepeatDay[]>
    getMeetingsByRepeatingDayOfWeek(dayOfWeek: number): Promise<MeetingRepeatDay[]>
}