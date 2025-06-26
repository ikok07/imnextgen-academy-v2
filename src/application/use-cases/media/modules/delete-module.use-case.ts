import {IModulesRepository} from "@/src/application/repositories/media/modules/modules.repository.interface";

export type IDeleteModuleUseCase = ReturnType<typeof deleteModuleUseCase>;

export const deleteModuleUseCase = (
    modulesRepository: IModulesRepository
) => async (moduleId: string) => {
    return modulesRepository.deleteModule(moduleId);
}