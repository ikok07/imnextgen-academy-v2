import {MentorSchedule} from "@/drizzle/schema/mentor_schedules";

export interface IMentorSchedulesRepository {
    getMentorSchedule(userId: string): Promise<MentorSchedule[]>
}