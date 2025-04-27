import {FullMeeting} from "@/drizzle/schema/meetings";
import {z} from "zod";
import {endOfDay, getHours, getMinutes, isSameDay, millisecondsToHours, startOfDay} from "date-fns";
import {getTimezoneOffset} from "date-fns-tz/getTimezoneOffset";
import {UTCDate} from "@date-fns/utc";

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
            hours: repeatedDay.start_hour_utc + millisecondsToHours(getTimezoneOffset("Europe/Sofia")),
            minutes: repeatedDay.start_minutes_utc
        }
    }
    const meetingDate = fullMeeting.meeting_dates.find(v => startOfDay(v.start_date).valueOf() <= targetDateSeconds && targetDateSeconds <= endOfDay(v.end_date).valueOf());
    if (meetingDate) {
        return {
            hours: getHours(new UTCDate(meetingDate.start_date * 1000)) + millisecondsToHours(getTimezoneOffset("Europe/Sofia")),
            minutes: getMinutes(meetingDate.start_date * 1000)
        }
    }

    return undefined;
}