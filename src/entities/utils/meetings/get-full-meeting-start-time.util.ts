import {FullMeeting} from "@/drizzle/schema/meetings";
import {z} from "zod";
import {endOfDay, getHours, getMinutes, isSameDay, startOfDay} from "date-fns";

export const fullMeetingStartTimeSchema = z.object({
    hours: z.number(),
    minutes: z.number()
});

export type FullMeetingStartTime = z.infer<typeof fullMeetingStartTimeSchema>;

export function getFullMeetingStartTime(fullMeeting: FullMeeting, targetDate: number): FullMeetingStartTime | undefined  {
    const targetDateSeconds = Math.floor(targetDate / 1000);
    const repeatedDay = fullMeeting.repeat_days.find(v => v.day_of_week === new Date(targetDate).getDay());
    if (repeatedDay) {
        return {
            hours: repeatedDay.start_hour_utc,
            minutes: repeatedDay.start_minutes_utc
        }
    }

    const meetingDate = fullMeeting.meeting_dates.find(v => startOfDay(v.start_date).valueOf() <= targetDateSeconds && targetDateSeconds <= endOfDay(v.end_date).valueOf());
    if (meetingDate) {
        return {
            hours: getHours(meetingDate.start_date),
            minutes: getMinutes(meetingDate.start_date)
        }
    }

    return undefined;
}