import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {
    IMeetingExcludedDatesRepository
} from "@/src/application/repositories/meetings/meeting-excluded-dates.repository.interface";
import {MeetingExcludedDate, meetingExcludedDateTable} from "@/drizzle/schema/meeting_excluded_dates";
import {and, eq, gte, inArray, lt} from "drizzle-orm";
import {DatabaseError} from "@/src/entities/errors/db/database";
import {addHours, startOfDay} from "date-fns";
import {meetingDateTable} from "@/drizzle/schema/meeting_dates";

export class MeetingExcludedDatesRepository extends BaseRepository implements IMeetingExcludedDatesRepository {
    getMultipleMeetingsExcludedDatesForDate(meetingIds: string[], startDate: number): Promise<MeetingExcludedDate[]> {
        const dayStart = Math.floor(startOfDay(startDate).valueOf() / 1000);
        const dayEnd = Math.floor(addHours(startOfDay(startDate).valueOf(), 24).valueOf() / 1000);

        try {
            return this.queryDB(db => {
                return db.query.meetingExcludedDateTable.findMany({where:
                        and(
                            inArray(meetingExcludedDateTable.meeting_id, meetingIds),
                            gte(meetingDateTable.start_date, dayStart),
                            lt(meetingDateTable.start_date, dayEnd)
                        )
                });
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get excluded dates for multiple meetings: ${e}`);
        }
    }
    getMeetingExcludedDates(meetingId: string): Promise<MeetingExcludedDate[]> {
        try {
            return this.queryDB(db => {
                return db.query.meetingExcludedDateTable.findMany({where: eq(meetingExcludedDateTable.id, meetingId)});
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get meeting excluded dates: ${e}`);
        }
    }
}