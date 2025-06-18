import {IUpdateModuleUseCase} from "@/src/application/use-cases/media/modules/update-module.use-case";
import {ModuleInsert} from "@/drizzle/schema/modules";

export type IUpdateModuleController = ReturnType<typeof updateModuleController>;

export const updateModuleController = (
    updateModuleUseCase: IUpdateModuleUseCase
) => async (data: Partial<ModuleInsert>) => {
    return updateModuleUseCase(data);
}