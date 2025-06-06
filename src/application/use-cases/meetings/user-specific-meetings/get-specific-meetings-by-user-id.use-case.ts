import {
    GetSpecificMeetingsByUserIdOptions,
    IUserSpecificMeetingsRepository
} from "@/src/application/repositories/meetings/user-specific-meetings.repository.interface";

export type IGetSpecificMeetingsByUserIdUseCase = ReturnType<typeof getSpecificMeetingsByUserIdUseCase>;

export const getSpecificMeetingsByUserIdUseCase = (
    userSpecificMeetingsRepository: IUserSpecificMeetingsRepository
) => async (opts: GetSpecificMeetingsByUserIdOptions) => {
    return userSpecificMeetingsRepository.getSpecificMeetingsByUserId(opts);
}