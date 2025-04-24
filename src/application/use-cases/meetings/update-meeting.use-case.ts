import {IMeetingsRepository} from "@/src/application/repositories/meetings/meetings.repository.interface";

export type IUpdateMeetingUseCase = ReturnType<typeof updateMeetingUseCase>;

export const updateMeetingUseCase = (
    meetingsRepository: IMeetingsRepository
) => (id: string, data: object) => {
    return meetingsRepository.updateMeetingById(id, data);
}