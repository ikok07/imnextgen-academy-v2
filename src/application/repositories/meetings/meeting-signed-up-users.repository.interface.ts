import {MeetingSignedUpUser, MeetingSignedUpUserInsert} from "@/drizzle/schema/meeting_signed_up_users";
import {z} from "zod";

export const getSignedUpUserByUserIdSchema = z.object({
    userId: z.string(),
    email: z.undefined(),
    meeting_id: z.string(),
    start_date: z.number()
});

export const getSignedUpUserByEmailSchema = z.object({
    userId: z.undefined(),
    email: z.string().email(),
    meeting_id: z.string(),
    start_date: z.number()
});

export const getSignedUpUserOptionsSchema = getSignedUpUserByUserIdSchema.or(getSignedUpUserByEmailSchema);
export const removeSignedUpUserOptionsSchema = getSignedUpUserByUserIdSchema.or(getSignedUpUserByEmailSchema);

export type GetSignedUpUserOptions = z.infer<typeof getSignedUpUserOptionsSchema>;
export type RemoveSignedUpUserOptions = z.infer<typeof removeSignedUpUserOptionsSchema>;

export interface IMeetingSignedUpUsersRepository {
    getSignedUpUsersForMeeting(meetingId: string): Promise<MeetingSignedUpUser[]>
    getSignedUpUserForMeeting(opts: GetSignedUpUserOptions): Promise<MeetingSignedUpUser | undefined>
    addSignedUpUser(data: MeetingSignedUpUserInsert): Promise<MeetingSignedUpUser>
    removeSignedUpUser(opts: RemoveSignedUpUserOptions): Promise<void>
}