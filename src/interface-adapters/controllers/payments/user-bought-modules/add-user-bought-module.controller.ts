import {
    IAddUserBoughtModuleUseCase
} from "@/src/application/use-cases/payments/user-bought-modules/add-user-bought-module.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IAddUserBoughtModuleController = ReturnType<typeof addUserBoughtModuleController>;

export const addUserBoughtModuleController = (
    addUserBoughtModuleUseCase: IAddUserBoughtModuleUseCase
) => (userId: string | undefined, moduleId: string | undefined) => {

    if (!userId) throw new InputParseError("Invalid userId!");
    if (!moduleId) throw new InputParseError("Invalid moduleId!");

    return addUserBoughtModuleUseCase(userId, moduleId)
}