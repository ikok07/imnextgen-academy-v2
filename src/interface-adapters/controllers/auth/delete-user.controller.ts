import {IDeleteUserUseCase} from "@/src/application/use-cases/auth/delete-user.use-case";
import {InputParseError} from "@/src/entities/errors/common";
import {IGetUserUseCase} from "@/src/application/use-cases/auth/get-user.use-case";

export type IDeleteUserController = ReturnType<typeof deleteUserController>;

export const deleteUserController = (
    deleteUserUseCase: IDeleteUserUseCase,
    getUserUseCase: IGetUserUseCase
) => async (userId: string | undefined) => {

    if (!userId) throw new InputParseError("Invalid userId!");

    const {user} = await getUserUseCase();
    if (!user) throw new Error("User not logged in!");

    if (user.id === userId) throw new Error("You cannot delete your account!");

    return deleteUserUseCase(userId);
}