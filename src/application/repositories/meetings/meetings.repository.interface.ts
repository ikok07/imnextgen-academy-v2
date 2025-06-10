import {Meeting, MeetingInsert, meetingSchema} from "@/drizzle/schema/meetings";
import {z} from "zod";
import {meetingRepeatDaySchema} from "@/drizzle/schema/meeting_repeat_days";
import {meetingExcludedDateSchema} from "@/drizzle/schema/meeting_excluded_dates";
import {meetingDateSchema} from "@/drizzle/schema/meeting_dates";

export const getSingleFullRegularMeetingByIdOptionsSchema = z.object({
    type: z.literal("single"),
    id: z.string(),
    userEmail: z.string().email()
});

export const getMultipleFullRegularMeetingsByIdOptionsSchema = z.object({
    type: z.literal("multiple"),
    ids: z.array(z.string()),
    userEmail: z.string().email()
});

export const getFullRegularMeetingByIdOptionsSchema = getSingleFullRegularMeetingByIdOptionsSchema.or(getMultipleFullRegularMeetingsByIdOptionsSchema);

export type GetSingleRegularFullMeetingByIdOptions = z.infer<typeof getSingleFullRegularMeetingByIdOptionsSchema>;
export type GetMultipleRegularFullMeetingsByIdOptions = z.infer<typeof getMultipleFullRegularMeetingsByIdOptionsSchema>;

export const getFullRegularMeetingByIdResultsSchema = z.array(z.object({
    meeting: meetingSchema,
    repeat_day: meetingRepeatDaySchema.nullable(),
    excluded_date: meetingExcludedDateSchema.nullable(),
    meeting_date: meetingDateSchema.nullable(),
}));

export type GetFullRegularMeetingByIdResults = z.infer<typeof getFullRegularMeetingByIdResultsSchema>;

export interface IMeetingsRepository {
    getMeetings(): Promise<Meeting[]>;
    getFullRegularMeetingById(options: GetSingleRegularFullMeetingByIdOptions | GetMultipleRegularFullMeetingsByIdOptions): Promise<GetFullRegularMeetingByIdResults | undefined>;
    getMeetingById(id: string): Promise<Meeting | undefined>;
    addMeeting(meeting: MeetingInsert): Promise<Meeting[]>;
    removeMeetingById(id: string): Promise<Meeting[]>;
    updateMeetingById(id: string, data: object): Promise<Meeting[]>;
}