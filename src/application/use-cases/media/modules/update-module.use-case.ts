import {IModulesRepository} from "@/src/application/repositories/media/modules/modules.repository.interface";
import {ModuleInsert} from "@/drizzle/schema/modules";

export type IUpdateModuleUseCase = ReturnType<typeof updateModuleUseCase>;

export const updateModuleUseCase = (
    modulesRepository: IModulesRepository
) => async (moduleId: string, data: Partial<ModuleInsert>) => {
    return modulesRepository.updateModule(moduleId, data);
}