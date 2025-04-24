import {
    IMeetingRepeatDaysRepository
} from "@/src/application/repositories/meetings/meeting-repeat-days.repository.interface";

export type IGetMeetingRepeatDaysUseCase = ReturnType<typeof getMeetingRepeatDaysUseCase>;

export const getMeetingRepeatDaysUseCase = (
    meetingRepeatDaysRepository: IMeetingRepeatDaysRepository
) => (meetingId: string) => {
    return meetingRepeatDaysRepository.getMeetingRepeatDays(meetingId)
}