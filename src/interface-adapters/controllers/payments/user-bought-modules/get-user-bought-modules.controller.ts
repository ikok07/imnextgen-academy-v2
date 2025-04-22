import {
    IGetUserBoughtModulesUseCase
} from "@/src/application/use-cases/payments/user-bought-modules/get-user-bought-modules.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetUserBoughtModulesController = ReturnType<typeof getUserBoughtModulesController>;

export const getUserBoughtModulesController = (
    getUserBoughtModulesUseCase: IGetUserBoughtModulesUseCase
) => (userId: string | undefined) => {

    if (!userId) throw new InputParseError("Invalid userId");

    return getUserBoughtModulesUseCase(userId)
}