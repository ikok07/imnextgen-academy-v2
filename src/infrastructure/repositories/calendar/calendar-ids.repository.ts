import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {ICalendarIdsRepository} from "@/src/application/repositories/calendar/calendar-ids.repository.interface";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {eq} from "drizzle-orm";
import {UserCalendarId, userCalendarIdsTable} from "@/drizzle/schema/user_calendar_ids";

export class CalendarIdsRepository extends BaseRepository implements ICalendarIdsRepository {
    getCalendarIdByUserId(userId: string): Promise<UserCalendarId> {
        try {
            return this.queryDB(async db => {
                const res = await db.query.userCalendarIdsTable.findFirst({where: eq(userCalendarIdsTable.profile_id, userId)});
                if (!res) throw new Error("Calendar id not found!");

                return res
            })
        } catch (e) {
            throw new DatabaseError(`Failed to get calendar id by user id! ${e}`);
        }
    }

}