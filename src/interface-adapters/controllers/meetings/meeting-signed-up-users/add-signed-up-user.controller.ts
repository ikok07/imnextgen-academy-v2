import {
    IAddSignedUpUserUseCase
} from "@/src/application/use-cases/meetings/meeting-signed-up-users/add-signed-up-user.use-case";
import {MeetingSignedUpUserInsert, meetingSignedUpUserInsertSchema} from "@/drizzle/schema/meeting_signed_up_users";
import {InputParseError} from "@/src/entities/errors/common";

export type IAddSignedUpUserController = ReturnType<typeof addSignedUpUserController>;

export const addSignedUpUserController = (
    addSignedUpUserUseCase: IAddSignedUpUserUseCase
) => async (data: Partial<MeetingSignedUpUserInsert>) => {

    const {data: parsedData, error} = meetingSignedUpUserInsertSchema.safeParse(data);
    if (error) throw new InputParseError(`Invalid signed up user data! ${error}`);

    return addSignedUpUserUseCase(parsedData);
}