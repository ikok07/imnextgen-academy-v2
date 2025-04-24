import {IMeetingsRepository} from "@/src/application/repositories/meetings/meetings.repository.interface";

export type IRemoveMeetingUseCase = ReturnType<typeof removeMeetingUseCase>;

export const removeMeetingUseCase = (
    meetingsRepository: IMeetingsRepository
) => (id: string) => {
    return meetingsRepository.removeMeetingById(id);
}