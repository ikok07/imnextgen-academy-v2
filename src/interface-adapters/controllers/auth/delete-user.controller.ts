import {IDeleteUserUseCase} from "@/src/application/use-cases/auth/delete-user.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IDeleteUserController = ReturnType<typeof deleteUserController>;

export const deleteUserController = (
    deleteUserUseCase: IDeleteUserUseCase
) => async (userId: string | undefined) => {

    if (!userId) throw new InputParseError("Invalid userId!");
    
    return deleteUserUseCase(userId);
}