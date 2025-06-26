import {IDeleteModuleUseCase} from "@/src/application/use-cases/media/modules/delete-module.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IDeleteModuleController = ReturnType<typeof deleteModuleController>;

export const deleteModuleController = (
    deleteModuleUseCase: IDeleteModuleUseCase
) => async (moduleId: string | undefined) => {

    if (!moduleId) throw new InputParseError("Invalid moduleId!");

    return deleteModuleUseCase(moduleId);
}