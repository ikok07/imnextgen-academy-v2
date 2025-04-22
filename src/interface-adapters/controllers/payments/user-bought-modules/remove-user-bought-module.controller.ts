import {
    IRemoveUserBoughtModuleUseCase
} from "@/src/application/use-cases/payments/user-bought-modules/remove-user-bought-module.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IRemoveUserBoughtModuleController = ReturnType<typeof removeUserBoughtModuleController>;

export const removeUserBoughtModuleController = (
    removeUserBoughtModuleUseCase: IRemoveUserBoughtModuleUseCase
) => (userId: string | undefined, moduleId: string | undefined) => {

    if (!userId) throw new InputParseError("Invalid userId!");
    if (!moduleId) throw new InputParseError("Invalid moduleId!");

    return removeUserBoughtModuleUseCase(userId, moduleId)
}