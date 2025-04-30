import {
    IAddUserBoughtModulesUseCase
} from "@/src/application/use-cases/payments/user-bought-modules/add-user-bought-modules.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IAddUserBoughtModulesController = ReturnType<typeof addUserBoughtModulesController>;

export const addUserBoughtModulesController = (
    addUserBoughtModuleUseCase: IAddUserBoughtModulesUseCase
) => (userId: string | undefined, moduleIds: string[] | undefined) => {

    if (!userId) throw new InputParseError("Invalid userId!");
    if (!moduleIds || moduleIds.length === 0) throw new InputParseError("Invalid moduleId!");

    return addUserBoughtModuleUseCase(userId, moduleIds)
}