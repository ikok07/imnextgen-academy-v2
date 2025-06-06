import {
    IAddUserSpecificMeetingUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/add-user-specific-meeting.use-case";
import {UserSpecificMeetingInsert} from "@/drizzle/schema/user_specific_meetings";

export type IAddUserSpecificMeetingController = ReturnType<typeof addUserSpecificMeetingController>;

export const addUserSpecificMeetingController = (
    addUserSpecificMeetingUseCase: IAddUserSpecificMeetingUseCase
) => async (data: UserSpecificMeetingInsert) => {
    return addUserSpecificMeetingUseCase(data);
}