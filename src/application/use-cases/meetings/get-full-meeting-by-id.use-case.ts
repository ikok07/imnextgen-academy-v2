import {
    GetMultipleFullMeetingsByIdOptions,
    GetSingleFullMeetingByIdOptions,
    IMeetingsRepository
} from "@/src/application/repositories/meetings/meetings.repository.interface";

export type IGetFullMeetingByIdUseCase = ReturnType<typeof getFullMeetingByIdUseCase>;

export const getFullMeetingByIdUseCase = (
    meetingsRepository: IMeetingsRepository
) => async (options: GetSingleFullMeetingByIdOptions | GetMultipleFullMeetingsByIdOptions) => {
    return meetingsRepository.getFullMeetingById(options);
}