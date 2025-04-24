import {IMeetingsRepository} from "@/src/application/repositories/meetings/meetings.repository.interface";

export type IGetFullMeetingByIdUseCase = ReturnType<typeof getFullMeetingByIdUseCase>;

export const getFullMeetingByIdUseCase = (
    meetingsRepository: IMeetingsRepository
) => async (id: string) => {
    return meetingsRepository.getFullMeetingById(id);
}