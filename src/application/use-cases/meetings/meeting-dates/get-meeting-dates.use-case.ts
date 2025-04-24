import {IMeetingDatesRepository} from "@/src/application/repositories/meetings/meeting-dates.repository.interface";

export type IGetMeetingDatesUseCase = ReturnType<typeof getMeetingDatesUseCase>;

export const getMeetingDatesUseCase = (
    meetingDatesRepository: IMeetingDatesRepository
) => async (meetingId: string) => {
    return meetingDatesRepository.getMeetingDates(meetingId)
}