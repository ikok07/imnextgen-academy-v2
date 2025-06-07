import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {
    IMentorSchedulesRepository
} from "@/src/application/repositories/meetings/mentor-schedules.repository.interface";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {MentorSchedule, mentorSchedulesTable} from "@/drizzle/schema/mentor_schedules";
import {eq} from "drizzle-orm";

export class MentorSchedulesRepository extends BaseRepository implements IMentorSchedulesRepository{
    getMentorSchedule(userId: string): Promise<MentorSchedule[]> {
        try {
            return this.queryDB(db => {
                return db
                    .select()
                    .from(mentorSchedulesTable)
                    .where(eq(mentorSchedulesTable.profile_id, userId));
            });
        } catch (e) {
            throw new DatabaseError(`Failed to get mentor schedule! ${e}`);
        }
    }
}