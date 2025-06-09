import {UserSpecificMeetingInsert} from "@/drizzle/schema/user_specific_meetings";
import {
    IUpdateUserSpecificMeetingUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/update-user-specific-meeting.use-case";

export type ISystemUpdateUserSpecificMeetingController = ReturnType<typeof systemUpdateUserSpecificMeetingController>;

export const systemUpdateUserSpecificMeetingController = (
    updateUserSpecificMeetingUseCase: IUpdateUserSpecificMeetingUseCase,
) => async (data: Partial<UserSpecificMeetingInsert>) => {
    return updateUserSpecificMeetingUseCase(data);
}