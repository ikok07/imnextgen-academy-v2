import {IMeetingsRepository} from "@/src/application/repositories/meetings/meetings.repository.interface";

export type IGetMeetingsUseCase = ReturnType<typeof getMeetingsUseCase>;

export const getMeetingsUseCase = (
    meetingsRepository: IMeetingsRepository
) => () => {
    return meetingsRepository.getMeetings();
}