import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {IMeetingDatesRepository} from "@/src/application/repositories/meetings/meeting-dates.repository.interface";
import {MeetingDate, meetingDateTable} from "@/drizzle/schema/meeting_dates";
import {DatabaseError} from "@/src/entities/errors/db/database";
import {and, eq, gte, lt} from "drizzle-orm";
import {addHours, startOfDay} from "date-fns";

export class MeetingDatesRepository extends BaseRepository implements IMeetingDatesRepository {
    getMeetingDates(meetingId: string): Promise<MeetingDate[]> {
        try {
            return this.queryDB(db => {
                return db.query.meetingDateTable.findMany({where: eq(meetingDateTable.meeting_id, meetingId)});
            })
        } catch (e) {
            throw new DatabaseError(`Failed to get meeting dates: ${e}`);
        }
    }
    getMeetingDatesByStartDate(startDate: number): Promise<MeetingDate[]> {
        try {
            const dayStart = Math.floor(startOfDay(startDate).valueOf() / 1000);
            const dayEnd = Math.floor(addHours(startOfDay(startDate).valueOf(), 24).valueOf() / 1000);

            return this.queryDB(db => {
                return db.query.meetingDateTable
                    .findMany({
                        where: and(gte(meetingDateTable.start_date, dayStart), lt(meetingDateTable.start_date, dayEnd))
                    });
            })
        } catch (e) {
            throw new DatabaseError(`Failed to get meetings by start date: ${e}`);
        }
    }
}