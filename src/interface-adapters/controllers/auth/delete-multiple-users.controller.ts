import {IDeleteUserUseCase} from "@/src/application/use-cases/auth/delete-user.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IDeleteMultipleUsersController = ReturnType<typeof deleteMultipleUsersController>;

export const deleteMultipleUsersController = (
    deleteUserUseCase: IDeleteUserUseCase
) => async (userIds: (string | undefined)[]) => {
    if (userIds.some(id => !id)) throw new InputParseError("Some of the user ids is undefined!");

    return Promise.all(userIds.map(id => deleteUserUseCase(id!)));
}