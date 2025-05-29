import {
    IGetSignedUpUsersForMeetingUseCase
} from "@/src/application/use-cases/meetings/meeting-signed-up-users/get-signed-up-users-for-meeting.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetSignedUpUsersForMeetingController = ReturnType<typeof getSignedUpUsersForMeetingController>;

export const getSignedUpUsersForMeetingController = (
    getSignedUpUsersForMeetingUseCase: IGetSignedUpUsersForMeetingUseCase
) => async (meetingId: string | undefined) => {

    if (!meetingId) throw new InputParseError("Invalid meetingId!");
    
    return getSignedUpUsersForMeetingUseCase(meetingId);
}