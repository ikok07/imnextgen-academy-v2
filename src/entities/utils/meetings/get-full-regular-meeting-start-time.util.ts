import {z} from "zod";
import {
    addMinutes,
    endOfDay,
    getHours,
    getMinutes,
    millisecondsToHours,
    millisecondsToMinutes,
    startOfDay
} from "date-fns";
import {getTimezoneOffset} from "date-fns-tz/getTimezoneOffset";
import {UTCDate} from "@date-fns/utc";
import {FullMeeting} from "@/src/entities/models/meetings/full-meeting";

export const fullRegularMeetingStartTimeSchema = z.object({
    timestamp: z.number(),
    hours: z.number(),
    minutes: z.number()
});

export type FullRegularMeetingStartTime = z.infer<typeof fullRegularMeetingStartTimeSchema>;

export function getFullRegularMeetingStartTime(fullMeeting: FullMeeting, targetDate: number): FullRegularMeetingStartTime | undefined  {
    if (fullMeeting.meetingType !== "regular") return undefined;

    const targetDateSeconds = Math.floor(targetDate / 1000);
    const repeatedDay = fullMeeting.repeat_days.find(v => v.day_of_week === new Date(targetDate).getDay());

    if (repeatedDay) {
        return {
            timestamp: addMinutes(targetDate, repeatedDay.start_hour_utc * 60 + repeatedDay.start_minutes_utc + millisecondsToMinutes(getTimezoneOffset("Europe/Sofia"))).valueOf(),
            hours: repeatedDay.start_hour_utc + millisecondsToHours(getTimezoneOffset("Europe/Sofia")),
            minutes: repeatedDay.start_minutes_utc
        }
    }
    const meetingDate = fullMeeting.meeting_dates.find(v => startOfDay(v.start_date).valueOf() <= targetDateSeconds && targetDateSeconds <= endOfDay(v.end_date).valueOf());
    if (meetingDate) {
        return {
            timestamp: meetingDate.start_date,
            hours: getHours(new UTCDate(meetingDate.start_date * 1000)) + millisecondsToHours(getTimezoneOffset("Europe/Sofia")),
            minutes: getMinutes(meetingDate.start_date * 1000)
        }
    }

    return undefined;
}