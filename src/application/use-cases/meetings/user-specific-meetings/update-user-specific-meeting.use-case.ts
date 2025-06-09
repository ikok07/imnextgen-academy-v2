import {
    IUserSpecificMeetingsRepository
} from "@/src/application/repositories/meetings/user-specific-meetings.repository.interface";
import {UserSpecificMeetingInsert} from "@/drizzle/schema/user_specific_meetings";

export type IUpdateUserSpecificMeetingUseCase = ReturnType<typeof updateUserSpecificMeetingUseCase>;

export const updateUserSpecificMeetingUseCase = (
    userSpecificMeetingsRepository: IUserSpecificMeetingsRepository
) => async (data: UserSpecificMeetingInsert) => {
    return userSpecificMeetingsRepository.updateUserSpecificMeeting(data);
}