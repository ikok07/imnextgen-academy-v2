import {IUpdateModuleUseCase} from "@/src/application/use-cases/media/modules/update-module.use-case";
import {ModuleInsert} from "@/drizzle/schema/modules";
import {InputParseError} from "@/src/entities/errors/common";

export type IUpdateModuleController = ReturnType<typeof updateModuleController>;

export const updateModuleController = (
    updateModuleUseCase: IUpdateModuleUseCase
) => async (moduleId: string | undefined, data: Partial<ModuleInsert>) => {

    if (!moduleId) throw new InputParseError("Invalid moduleId!");

    return updateModuleUseCase(moduleId, data);
}