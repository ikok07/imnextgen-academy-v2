import {
    IUserSpecificMeetingsRepository
} from "@/src/application/repositories/meetings/user-specific-meetings.repository.interface";

export type IRemoveUserSpecificMeetingUseCase = ReturnType<typeof removeUserSpecificMeetingUseCase>;

export const removeUserSpecificMeetingUseCase = (
    userSpecificMeetingsRepository: IUserSpecificMeetingsRepository
) => async (id: string) => {
    return userSpecificMeetingsRepository.removeUserSpecificMeeting(id);
}