import {
    IAddSignedUpUserUseCase
} from "@/src/application/use-cases/meetings/meeting-signed-up-users/add-signed-up-user.use-case";
import {MeetingSignedUpUserInsert} from "@/drizzle/schema/meeting_signed_up_users";

export type IAddSignedUpUserController = ReturnType<typeof addSignedUpUserController>;

export const addSignedUpUserController = (
    addSignedUpUserUseCase: IAddSignedUpUserUseCase
) => async (data: MeetingSignedUpUserInsert) => {
    return addSignedUpUserUseCase(data);
}