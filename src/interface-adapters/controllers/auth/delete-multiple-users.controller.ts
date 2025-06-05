import {IDeleteUserUseCase} from "@/src/application/use-cases/auth/delete-user.use-case";
import {InputParseError} from "@/src/entities/errors/common";
import {IGetUserUseCase} from "@/src/application/use-cases/auth/get-user.use-case";

export type IDeleteMultipleUsersController = ReturnType<typeof deleteMultipleUsersController>;

export const deleteMultipleUsersController = (
    deleteUserUseCase: IDeleteUserUseCase,
    getUserUseCase: IGetUserUseCase
) => async (userIds: (string | undefined)[]) => {
    if (userIds.some(id => !id)) throw new InputParseError("Some of the user ids is undefined!");

    const {user} = await getUserUseCase();
    if (!user) throw new Error("User not logged in!");

    if (userIds.some(id => user.id === id)) throw new Error("You cannot delete your account!");

    return Promise.all(userIds.map(id => deleteUserUseCase(id!)));
}