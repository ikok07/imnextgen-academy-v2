import {
    GetSpecificMeetingsByMentorProfileIdOptions,
    IUserSpecificMeetingsRepository
} from "@/src/application/repositories/meetings/user-specific-meetings.repository.interface";

export type IGetSpecificMeetingsByMentorProfileIdUseCase = ReturnType<typeof getSpecificMeetingsByMentorProfileIdUseCase>;

export const getSpecificMeetingsByMentorProfileIdUseCase = (
    userSpecificMeetingsRepository: IUserSpecificMeetingsRepository
) => async (opts: GetSpecificMeetingsByMentorProfileIdOptions) => {
    return userSpecificMeetingsRepository.getSpecificMeetingsByMentorId(opts);
}