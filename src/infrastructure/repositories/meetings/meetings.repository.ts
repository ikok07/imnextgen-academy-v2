import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {
    GetFullMeetingByIdResults,
    GetMultipleFullMeetingsByIdOptions,
    GetSingleFullMeetingByIdOptions,
    IMeetingsRepository
} from "@/src/application/repositories/meetings/meetings.repository.interface";
import {Meeting, MeetingInsert, meetingsTable} from "@/drizzle/schema/meetings";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {and, eq, inArray} from "drizzle-orm";
import {meetingRepeatDayTable} from "@/drizzle/schema/meeting_repeat_days";
import {meetingExcludedDateTable} from "@/drizzle/schema/meeting_excluded_dates";
import {meetingDateTable} from "@/drizzle/schema/meeting_dates";
import {meetingSignedUpUsersTable} from "@/drizzle/schema/meeting_signed_up_users";

export class MeetingsRepository extends BaseRepository implements IMeetingsRepository {
    getMeetings(): Promise<Meeting[]> {
        try {
            return this.queryDB(db => {
                return db.query.meetingsTable.findMany();
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get meetings: ${e}`);
        }
    }

    getFullMeetingById(options: GetSingleFullMeetingByIdOptions | GetMultipleFullMeetingsByIdOptions): Promise<GetFullMeetingByIdResults | undefined> {
        try {
            return this.queryDB(async db => {
                const results = await db
                    .select({
                        meeting: meetingsTable,
                        repeat_day: meetingRepeatDayTable,
                        excluded_date: meetingExcludedDateTable,
                        meeting_date: meetingDateTable,
                    })
                    .from(meetingsTable)
                    .where(
                        options.type === "single" ? eq(meetingsTable.id, options.id) : inArray(meetingsTable.id, options.ids)
                    )
                    .leftJoin(meetingRepeatDayTable, eq(meetingRepeatDayTable.meeting_id, meetingsTable.id))
                    .leftJoin(meetingExcludedDateTable, eq(meetingExcludedDateTable.meeting_id, meetingsTable.id))
                    .leftJoin(meetingDateTable, eq(meetingDateTable.meeting_id, meetingsTable.id))

                if (results.length === 0) return options.type === "single" ? undefined : [];

                return results;
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get full meeting by id: ${e}`);
        }
    }

    getMeetingById(id: string): Promise<Meeting | undefined> {
        try {
            return this.queryDB(db => {
                return db.query.meetingsTable.findFirst({where: eq(meetingsTable.id, id)});
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get meeting by id: ${e}`);
        }
    }
    addMeeting(meeting: MeetingInsert): Promise<Meeting[]> {
        try {
            return this.queryDB(db => {
                return db.insert(meetingsTable).values(meeting).returning();
            })
        } catch(e) {
            throw new DatabaseError(`Failed to add meeting: ${e}`);
        }
    }
    removeMeetingById(id: string): Promise<Meeting[]> {
        try {
            return this.queryDB(db => {
                return db.delete(meetingsTable).where(eq(meetingsTable.id, id)).returning();
            })
        } catch(e) {
            throw new DatabaseError(`Failed to remove meeting by id: ${e}`);
        }
    }
    updateMeetingById(id: string, data: object): Promise<Meeting[]> {
        try {
            return this.queryDB(db => {
                return db.update(meetingsTable).set(data).where(eq(meetingsTable.id, id)).returning();
            })
        } catch(e) {
            throw new DatabaseError(`Failed to update meeting by id: ${e}`);
        }
    }

}