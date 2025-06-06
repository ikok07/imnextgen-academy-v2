import {
    IRemoveUserSpecificMeetingUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/remove-user-specific-meeting.use-case";

export type IRemoveUserSpecificMeetingController = ReturnType<typeof removeUserSpecificMeetingController>;

export const removeUserSpecificMeetingController = (
    removeUserSpecificMeetingUseCase: IRemoveUserSpecificMeetingUseCase
) => async (id: string) => {
    return removeUserSpecificMeetingUseCase(id);
}