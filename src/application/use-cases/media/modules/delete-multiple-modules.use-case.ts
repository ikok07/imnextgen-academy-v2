import {IModulesRepository} from "@/src/application/repositories/media/modules/modules.repository.interface";

export type IDeleteMultipleModulesUseCase = ReturnType<typeof deleteMultipleModulesUseCase>;

export const deleteMultipleModulesUseCase = (
    modulesRepository: IModulesRepository
) => async (moduleIds: string[]) => {
    return modulesRepository.deleteMultipleModules(moduleIds);
}