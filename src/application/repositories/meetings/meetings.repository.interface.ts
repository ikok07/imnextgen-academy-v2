import {FullMeeting, Meeting, MeetingInsert} from "@/drizzle/schema/meetings";
import {z} from "zod";


export const getSingleFullMeetingByIdOptionsSchema = z.object({
    type: z.literal("single"),
    id: z.string()
});

export const getMultipleFullMeetingsByIdOptionsSchema = z.object({
    type: z.literal("multiple"),
    ids: z.array(z.string())
});

export const getFullMeetingByIdOptionsSchema = getSingleFullMeetingByIdOptionsSchema.or(getMultipleFullMeetingsByIdOptionsSchema);

export type GetSingleFullMeetingByIdOptions = z.infer<typeof getSingleFullMeetingByIdOptionsSchema>;
export type GetMultipleFullMeetingsByIdOptions = z.infer<typeof getMultipleFullMeetingsByIdOptionsSchema>;

export interface IMeetingsRepository {
    getMeetings(): Promise<Meeting[]>;
    getFullMeetingById(options: GetSingleFullMeetingByIdOptions | GetMultipleFullMeetingsByIdOptions): Promise<FullMeeting | FullMeeting[] | undefined>;
    getMeetingById(id: string): Promise<Meeting | undefined>;
    addMeeting(meeting: MeetingInsert): Promise<Meeting[]>;
    removeMeetingById(id: string): Promise<Meeting[]>;
    updateMeetingById(id: string, data: object): Promise<Meeting[]>;
}