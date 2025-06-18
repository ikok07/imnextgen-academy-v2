import {IModulesRepository} from "@/src/application/repositories/media/modules/modules.repository.interface";
import {ModuleInsert} from "@/drizzle/schema/modules";

export type ICreateModuleUseCase = ReturnType<typeof createModuleUseCase>;

export const createModuleUseCase = (
    modulesRepository: IModulesRepository
) => async (data: ModuleInsert) => {
    return modulesRepository.createModule(data);
}