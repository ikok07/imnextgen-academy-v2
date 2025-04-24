import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {
    IMeetingRepeatDaysRepository
} from "@/src/application/repositories/meetings/meeting-repeat-days.repository.interface";
import {MeetingRepeatDay, meetingRepeatDayTable} from "@/drizzle/schema/meeting_repeat_days";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {eq} from "drizzle-orm";

export class MeetingRepeatDaysRepository extends BaseRepository implements IMeetingRepeatDaysRepository {
    getMeetingRepeatDays(meetingId: string): Promise<MeetingRepeatDay[]> {
        try {
            return this.queryDB(db => {
                return db.query.meetingRepeatDayTable.findMany({where: eq(meetingRepeatDayTable.meeting_id, meetingId)});
            })
        } catch (e) {
            throw new DatabaseError(`Failed to get meeting repeat days: ${e}`);
        }
    }
    getMeetingsByRepeatingDayOfWeek(dayOfWeek: number): Promise<MeetingRepeatDay[]> {
        try {
            return this.queryDB(db => {
                return db.query.meetingRepeatDayTable.findMany({where: eq(meetingRepeatDayTable.day_of_week, dayOfWeek)});
            })
        } catch (e) {
            throw new DatabaseError(`Failed to get meeting by repeating day of week: ${e}`);
        }
    }
}