import {
    IMeetingSignedUpUsersRepository
} from "@/src/application/repositories/meetings/meeting-signed-up-users.repository.interface";
import {MeetingSignedUpUserInsert} from "@/drizzle/schema/meeting_signed_up_users";

export type IAddSignedUpUserUseCase = ReturnType<typeof addSignedUpUserUseCase>;

export const addSignedUpUserUseCase = (
    meetingSignedUpUsersRepository: IMeetingSignedUpUsersRepository
) => async (data: MeetingSignedUpUserInsert) => {
    return meetingSignedUpUsersRepository.addSignedUpUser(data);
}