import {IModulesRepository} from "@/src/application/repositories/media/modules.repository.interface";

export type IGetModulesUseCase = ReturnType<typeof getModulesUseCase>;

export const getModulesUseCase = (
    modulesRepository: IModulesRepository
) => async () => {
    return modulesRepository.getModules();
}