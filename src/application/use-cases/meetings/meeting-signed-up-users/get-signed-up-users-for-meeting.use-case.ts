import {
    IMeetingSignedUpUsersRepository
} from "@/src/application/repositories/meetings/meeting-signed-up-users.repository.interface";

export type IGetSignedUpUsersForMeetingUseCase = ReturnType<typeof getSignedUpUsersForMeetingUseCase>;

export const getSignedUpUsersForMeetingUseCase = (
    meetingSignedUpUsersRepository: IMeetingSignedUpUsersRepository
) => async (meetingId: string) => {
    return meetingSignedUpUsersRepository.getSignedUpUsersForMeeting(meetingId);
}