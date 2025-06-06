import {
    IUpdateUserSpecificMeetingUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/update-user-specific-meeting.use-case";
import {UserSpecificMeetingInsert} from "@/drizzle/schema/user_specific_meetings";

export type IUpdateUserSpecificMeetingController = ReturnType<typeof updateUserSpecificMeetingController>;

export const updateUserSpecificMeetingController = (
    updateUserSpecificMeetingUseCase: IUpdateUserSpecificMeetingUseCase
) => async (data: UserSpecificMeetingInsert) => {
    return updateUserSpecificMeetingUseCase(data);
}