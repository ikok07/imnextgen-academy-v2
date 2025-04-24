import {IMeetingsRepository} from "@/src/application/repositories/meetings/meetings.repository.interface";

export type IGetMeetingByIdUseCase = ReturnType<typeof getMeetingByIdUseCase>;

export const getMeetingByIdUseCase = (
    meetingsRepository: IMeetingsRepository
) => (id: string) => {
    return meetingsRepository.getMeetingById(id);
}