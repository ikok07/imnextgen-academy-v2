import {
    IMeetingExcludedDatesRepository
} from "@/src/application/repositories/meetings/meeting-excluded-dates.repository.interface";

export type IGetMeetingExcludedDatesUseCase = ReturnType<typeof getMeetingExcludedDatesUseCase>;

export const getMeetingExcludedDatesUseCase = (
    meetingExcludedDatesRepository: IMeetingExcludedDatesRepository
) => async (meetingId: string) => {
    return meetingExcludedDatesRepository.getMeetingExcludedDates(meetingId)
}