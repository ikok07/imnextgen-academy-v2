import {MeetingRepeatDay} from "@/drizzle/schema/meeting_repeat_days";
import {MeetingExcludedDate} from "@/drizzle/schema/meeting_excluded_dates";
import {MeetingDate} from "@/drizzle/schema/meeting_dates";
import {Meeting} from "@/drizzle/schema/meetings";
import {UserSpecificMeeting} from "@/drizzle/schema/user_specific_meetings";

export type FullRegularMeeting = {meetingType: "regular"} & Meeting &
    {repeat_days: Omit<MeetingRepeatDay, "meeting_id">[]} &
    {excluded_dates: Omit<MeetingExcludedDate, "meeting_id">[]} &
    {meeting_dates: Omit<MeetingDate, "meeting_id">[]}

export type FullSpecificMeeting = {meetingType: "specific"} & Meeting & UserSpecificMeeting;

export type FullMeeting = FullRegularMeeting | FullSpecificMeeting;
