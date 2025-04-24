import {IMeetingDatesRepository} from "@/src/application/repositories/meetings/meeting-dates.repository.interface";

export type IGetMeetingDatesByStartDateUseCase = ReturnType<typeof getMeetingDatesByStartDateUseCase>;

export const getMeetingDatesByStartDateUseCase = (
    meetingDatesRepository: IMeetingDatesRepository
) => (startDate: number) => {
    return meetingDatesRepository.getMeetingDatesByStartDate(startDate);
}