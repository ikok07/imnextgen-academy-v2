import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {
    GetSpecificMeetingsByMentorProfileIdOptions,
    GetSpecificMeetingsByUserIdOptions,
    IUserSpecificMeetingsRepository
} from "@/src/application/repositories/meetings/user-specific-meetings.repository.interface";
import {
    UserSpecificMeeting,
    UserSpecificMeetingInsert,
    userSpecificMeetingsTable
} from "@/drizzle/schema/user_specific_meetings";
import {DatabaseError} from "@/src/entities/errors/db/database";
import {and, eq, gte, lt, SQL} from "drizzle-orm";
import {addHours, startOfDay} from "date-fns";

export class UserSpecificMeetingsRepository extends BaseRepository implements IUserSpecificMeetingsRepository {
    private getStartDatePredicate(startDate: number, timezoneOffsetMin: number) {
        const utcStartDate = startDate + timezoneOffsetMin * 60 * 1000;
        const dayStart = Math.floor(startOfDay(utcStartDate).valueOf() / 1000);
        const dayEnd = Math.floor(addHours(startOfDay(utcStartDate).valueOf(), 24).valueOf() / 1000);
        return and(gte(userSpecificMeetingsTable.date, dayStart), lt(userSpecificMeetingsTable.date, dayEnd))
    }

    getSpecificMeetingsByUserId({userId, timezoneOffsetMin, startDate, meetingType}: GetSpecificMeetingsByUserIdOptions): Promise<UserSpecificMeeting[]> {
        try {
            const userIdPredicate = eq(userSpecificMeetingsTable.profile_id, userId);
            let startDatePredicate: SQL<unknown> | undefined;
            let typePredicate: SQL<unknown> | undefined;

            if (startDate) startDatePredicate = this.getStartDatePredicate(startDate, timezoneOffsetMin);

            if (meetingType) typePredicate = eq(userSpecificMeetingsTable.type, meetingType);

            const wherePredicate = and(userIdPredicate, startDatePredicate, typePredicate);

            return this.queryDB(db => {
                return db.query.userSpecificMeetingsTable.findMany({where: wherePredicate})
            })
        } catch (e) {
            throw new DatabaseError(`Failed to get user specific meetings! ${e}`);
        }
    }

    getSpecificMeetingsByMentorId({mentorProfileId, timezoneOffsetMin, startDate, meetingType}: GetSpecificMeetingsByMentorProfileIdOptions): Promise<UserSpecificMeeting[]> {
        try {
            const mentorProfileIdPredicate = eq(userSpecificMeetingsTable.mentor_profile_id, mentorProfileId);
            let startDatePredicate: SQL<unknown> | undefined;
            let typePredicate: SQL<unknown> | undefined;

            if (startDate) startDatePredicate = this.getStartDatePredicate(startDate, timezoneOffsetMin);

            if (meetingType) typePredicate = eq(userSpecificMeetingsTable.type, meetingType);

            const wherePredicate = and(mentorProfileIdPredicate, startDatePredicate, typePredicate);

            return this.queryDB(db => {
                return db.query.userSpecificMeetingsTable.findMany({where: wherePredicate})
            })
        } catch (e) {
            throw new DatabaseError(`Failed to get user specific meetings by mentor profile id! ${e}`);
        }
    }

    addUserSpecificMeeting(data: UserSpecificMeetingInsert): Promise<UserSpecificMeeting> {
        try {
            return this.queryDB(async db => {
                const result =  await db.insert(userSpecificMeetingsTable).values(data).returning();
                if (result.length === 0) throw new Error("Failed to add user specific meeting!");
                return result[0];
            })
        } catch (e) {
            throw new DatabaseError(`Failed to add user specific meetings! ${e}`);
        }
    }
    updateUserSpecificMeeting(data: Partial<UserSpecificMeetingInsert>): Promise<UserSpecificMeeting> {
        try {
            return this.queryDB(async db => {
                const result =  await db.update(userSpecificMeetingsTable).set(data).returning();
                if (result.length === 0) throw new Error("Failed to update user specific meeting!");
                return result[0];
            })
        } catch (e) {
            throw new DatabaseError(`Failed to update user specific meetings! ${e}`);
        }
    }
    removeUserSpecificMeeting(id: string): Promise<void> {
        try {
            return this.queryDB(async db => {
                await db.delete(userSpecificMeetingsTable).where(eq(userSpecificMeetingsTable.id, id));
            });
        } catch (e) {
            throw new DatabaseError(`Failed to update user specific meetings! ${e}`);
        }
    }
}