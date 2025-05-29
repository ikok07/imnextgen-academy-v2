import {FullMeeting, Meeting, MeetingInsert, meetingSchema} from "@/drizzle/schema/meetings";
import {z} from "zod";
import {meetingRepeatDaySchema} from "@/drizzle/schema/meeting_repeat_days";
import {meetingExcludedDateSchema} from "@/drizzle/schema/meeting_excluded_dates";
import {meetingDateSchema} from "@/drizzle/schema/meeting_dates";
import {meetingSignedUpUserSchema} from "@/drizzle/schema/meeting_signed_up_users";


export const getSingleFullMeetingByIdOptionsSchema = z.object({
    type: z.literal("single"),
    id: z.string(),
    userEmail: z.string().email()
});

export const getMultipleFullMeetingsByIdOptionsSchema = z.object({
    type: z.literal("multiple"),
    ids: z.array(z.string()),
    userEmail: z.string().email()
});

export const getFullMeetingByIdOptionsSchema = getSingleFullMeetingByIdOptionsSchema.or(getMultipleFullMeetingsByIdOptionsSchema);

export type GetSingleFullMeetingByIdOptions = z.infer<typeof getSingleFullMeetingByIdOptionsSchema>;
export type GetMultipleFullMeetingsByIdOptions = z.infer<typeof getMultipleFullMeetingsByIdOptionsSchema>;

export const getFullMeetingByIdResultsSchema = z.array(z.object({
    meeting: meetingSchema,
    repeat_day: meetingRepeatDaySchema.nullable(),
    excluded_date: meetingExcludedDateSchema.nullable(),
    meeting_date: meetingDateSchema.nullable(),
}));

export type GetFullMeetingByIdResults = z.infer<typeof getFullMeetingByIdResultsSchema>;

export interface IMeetingsRepository {
    getMeetings(): Promise<Meeting[]>;
    getFullMeetingById(options: GetSingleFullMeetingByIdOptions | GetMultipleFullMeetingsByIdOptions): Promise<GetFullMeetingByIdResults | undefined>;
    getMeetingById(id: string): Promise<Meeting | undefined>;
    addMeeting(meeting: MeetingInsert): Promise<Meeting[]>;
    removeMeetingById(id: string): Promise<Meeting[]>;
    updateMeetingById(id: string, data: object): Promise<Meeting[]>;
}