import {
    IMeetingSignedUpUsersRepository, RemoveSignedUpUserOptions
} from "@/src/application/repositories/meetings/meeting-signed-up-users.repository.interface";

export type IRemoveSignedUpUserUseCase = ReturnType<typeof removeSignedUpUserUseCase>;

export const removeSignedUpUserUseCase = (
    meetingSignedUpUsersRepository: IMeetingSignedUpUsersRepository
) => async (opts: RemoveSignedUpUserOptions) => {
    return meetingSignedUpUsersRepository.removeSignedUpUser(opts)
}