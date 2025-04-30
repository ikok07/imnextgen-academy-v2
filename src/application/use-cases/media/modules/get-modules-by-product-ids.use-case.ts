import {IModulesRepository} from "@/src/application/repositories/media/modules/modules.repository.interface";

export type IGetModulesByProductIdsUseCase = ReturnType<typeof getModulesByProductIdsUseCase>;

export const getModulesByProductIdsUseCase = (
    modulesRepository: IModulesRepository
) => async (productIds: string[]) => {
    return modulesRepository.getModulesByProductIds(productIds);
}