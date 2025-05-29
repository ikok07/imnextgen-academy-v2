import {
    IRemoveSignedUpUserUseCase
} from "@/src/application/use-cases/meetings/meeting-signed-up-users/remove-signed-up-user.use-case";
import {
    RemoveSignedUpUserOptions, removeSignedUpUserOptionsSchema
} from "@/src/application/repositories/meetings/meeting-signed-up-users.repository.interface";
import {InputParseError} from "@/src/entities/errors/common";

export type IRemoveSignedUpUserController = ReturnType<typeof removeSignedUpUserController>;

export const removeSignedUpUserController = (
    removeSignedUpUserUseCase: IRemoveSignedUpUserUseCase
) => async (opts: Partial<RemoveSignedUpUserOptions>) => {
    const {data, error} = removeSignedUpUserOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    return removeSignedUpUserUseCase(data);
}