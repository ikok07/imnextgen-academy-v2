import {IModulesRepository} from "@/src/application/repositories/media/modules/modules.repository.interface";

export type IGetModulesByIdsUseCase = ReturnType<typeof getModulesByIdsUseCase>;

export const getModulesByIdsUseCase = (
    modulesRepository: IModulesRepository
) => async (ids: string[]) => {
    return modulesRepository.getModulesByIds(ids);
}