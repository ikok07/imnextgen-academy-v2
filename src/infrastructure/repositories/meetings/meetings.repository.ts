import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {IMeetingsRepository} from "@/src/application/repositories/meetings/meetings.repository.interface";
import {FullMeeting, Meeting, MeetingInsert, meetingsTable} from "@/drizzle/schema/meetings";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {eq} from "drizzle-orm";
import {meetingRepeatDayTable} from "@/drizzle/schema/meeting_repeat_days";
import {meetingExcludedDateTable} from "@/drizzle/schema/meeting_excluded_dates";
import {meetingDateTable} from "@/drizzle/schema/meeting_dates";

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

    getFullMeetingById(id: string): Promise<FullMeeting | undefined> {
        try {
            return this.queryDB(async db => {
                const results = await db
                    .select({
                        meeting: meetingsTable,
                        repeat_day: meetingRepeatDayTable,
                        excluded_date: meetingExcludedDateTable,
                        meeting_date: meetingDateTable
                    })
                    .from(meetingsTable)
                    .where(eq(meetingsTable.id, id))
                    .leftJoin(meetingRepeatDayTable, eq(meetingRepeatDayTable.meeting_id, id))
                    .leftJoin(meetingExcludedDateTable, eq(meetingExcludedDateTable.meeting_id, id))
                    .leftJoin(meetingDateTable, eq(meetingDateTable.meeting_id, id));

                if (results.length === 0) return undefined;

                const repeatDays = results.map(r => r.repeat_day).filter(r => !!r);
                const excludedDates = results.map(r => r.excluded_date).filter(r => !!r);
                const meetingDates = results.map(r => r.meeting_date).filter(r => !!r);

                return {
                    ...results[0].meeting,
                    repeat_days: repeatDays,
                    excluded_dates: excludedDates,
                    meeting_dates: meetingDates
                }
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