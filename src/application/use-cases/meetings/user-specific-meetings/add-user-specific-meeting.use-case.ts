import {
    IUserSpecificMeetingsRepository
} from "@/src/application/repositories/meetings/user-specific-meetings.repository.interface";
import {UserSpecificMeetingInsert} from "@/drizzle/schema/user_specific_meetings";

export type IAddUserSpecificMeetingUseCase = ReturnType<typeof addUserSpecificMeetingUseCase>;

export const addUserSpecificMeetingUseCase = (
    userSpecificMeetingsRepository: IUserSpecificMeetingsRepository
) => async (data: UserSpecificMeetingInsert) => {
    return userSpecificMeetingsRepository.addUserSpecificMeeting(data);
}