import {
    IMeetingExcludedDatesRepository
} from "@/src/application/repositories/meetings/meeting-excluded-dates.repository.interface";

export type IGetMultipleMeetingsExcludedDatesForDateUseCase = ReturnType<typeof getMultipleMeetingsExcludedDatesForDateUseCase>;

export const getMultipleMeetingsExcludedDatesForDateUseCase = (
    meetingExcludedDatesRepository: IMeetingExcludedDatesRepository
) => (moduleIds: string[], startDate: number) => {
    return meetingExcludedDatesRepository.getMultipleMeetingsExcludedDatesForDate(moduleIds, startDate)
}