import {
    IMentorSchedulesRepository
} from "@/src/application/repositories/meetings/mentor-schedules.repository.interface";
import {FullMentorSchedule} from "@/src/entities/models/meetings/full-mentor-schedule";

export type IGetMentorSchedulesUseCase = ReturnType<typeof getMentorSchedulesUseCase>;

export const getMentorSchedulesUseCase = (
    mentorSchedulesRepository: IMentorSchedulesRepository
) => async (userId: string) => {
    const rawResults = await mentorSchedulesRepository.getMentorSchedule(userId);

    return {
        profile_id: userId,
        days: rawResults.map(r => ({
            dayOfWeek: r.day_of_week,
            startHour: r.start_hour,
            startMinutes: r.start_minutes,
            durationMinutes: r.duration_minutes
        }))
    } as FullMentorSchedule;
}