import {
    IMeetingRepeatDaysRepository
} from "@/src/application/repositories/meetings/meeting-repeat-days.repository.interface";

export type IGetMeetingsByRepeatingDayOfWeekUseCase = ReturnType<typeof getMeetingsByRepeatingDayOfWeekUseCase>;

export const getMeetingsByRepeatingDayOfWeekUseCase = (
    meetingRepeatDaysRepository: IMeetingRepeatDaysRepository
) => (dayOfWeek: number) => {
    return meetingRepeatDaysRepository.getMeetingsByRepeatingDayOfWeek(dayOfWeek)
}