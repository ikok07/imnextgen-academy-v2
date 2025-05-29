import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {
    GetSignedUpUserOptions,
    IMeetingSignedUpUsersRepository,
    RemoveSignedUpUserOptions
} from "@/src/application/repositories/meetings/meeting-signed-up-users.repository.interface";
import {
    MeetingSignedUpUser,
    MeetingSignedUpUserInsert,
    meetingSignedUpUsersTable
} from "@/drizzle/schema/meeting_signed_up_users";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {and, eq} from "drizzle-orm";

export class MeetingSignedUpUsersRepository extends BaseRepository implements IMeetingSignedUpUsersRepository {
    getSignedUpUsersForMeeting(meetingId: string): Promise<MeetingSignedUpUser[]> {
        try {
            return this.queryDB(db => {
                return db.query.meetingSignedUpUsersTable.findMany({where: eq(meetingSignedUpUsersTable.id, meetingId)});
            })
        } catch (e) {
            throw new DatabaseError(`Failed to get signed up users for meeting: ${e}`);
        }
    }
    async getSignedUpUserForMeeting(opts: GetSignedUpUserOptions): Promise<MeetingSignedUpUser | undefined> {
        try {
            const res = await this.queryDB(async db => {
                if (opts.userId) {
                    return db.query.meetingSignedUpUsersTable.findFirst({where: and(eq(meetingSignedUpUsersTable.profile_id, opts.userId), eq(meetingSignedUpUsersTable.meeting_id, opts.meeting_id), eq(meetingSignedUpUsersTable.meeting_start_date, opts.start_date))});
                }
                return db.query.meetingSignedUpUsersTable.findFirst({where: and(eq(meetingSignedUpUsersTable.email, opts.email!), eq(meetingSignedUpUsersTable.meeting_id, opts.meeting_id), eq(meetingSignedUpUsersTable.meeting_start_date, opts.start_date))});
            });
            return res;
        } catch (e) {
            throw new DatabaseError(`Failed to get signed up user for meeting: ${e}`);
        }
    }
    addSignedUpUser(data: MeetingSignedUpUserInsert): Promise<MeetingSignedUpUser> {
        try {
            return this.queryDB(async db => {
                const res = await db.insert(meetingSignedUpUsersTable).values(data).returning();
                if (res.length === 0) throw new Error("Signed up user could not be added to the database!");
                return res[0];
            })
        } catch (e) {
            throw new DatabaseError(`Failed to get signed up users for meeting: ${e}`);
        }
    }
    removeSignedUpUser(opts: RemoveSignedUpUserOptions): Promise<void> {
        try {
            return this.queryDB(async db => {
                if (opts.userId) {
                    await db.delete(meetingSignedUpUsersTable).where(and(eq(meetingSignedUpUsersTable.profile_id, opts.userId), eq(meetingSignedUpUsersTable.meeting_id, opts.meeting_id), eq(meetingSignedUpUsersTable.meeting_start_date, opts.start_date)));
                } else {
                    await db.delete(meetingSignedUpUsersTable).where(and(eq(meetingSignedUpUsersTable.email, opts.email!), eq(meetingSignedUpUsersTable.meeting_id, opts.meeting_id), eq(meetingSignedUpUsersTable.meeting_start_date, opts.start_date)));
                }
            })
        } catch (e) {
            throw new DatabaseError(`Failed to get signed up users for meeting: ${e}`);
        }
    }
}