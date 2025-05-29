import {
    GetSignedUpUserOptions,
    IMeetingSignedUpUsersRepository
} from "@/src/application/repositories/meetings/meeting-signed-up-users.repository.interface";

export type IGetSignedUpUserForMeetingUseCase = ReturnType<typeof getSignedUpUserForMeetingUseCase>;

export const getSignedUpUserForMeetingUseCase = (
    meetingSignedUpUsersRepository: IMeetingSignedUpUsersRepository
) => async (opts: GetSignedUpUserOptions) => {
    return meetingSignedUpUsersRepository.getSignedUpUserForMeeting(opts)
}