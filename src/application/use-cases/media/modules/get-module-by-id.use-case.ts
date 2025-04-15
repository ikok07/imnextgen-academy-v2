import {IModulesRepository} from "@/src/application/repositories/media/modules/modules.repository.interface";

export type IGetModuleByIdUseCase = ReturnType<typeof getModuleByIdUseCase>;

export const getModuleByIdUseCase = (
    modulesRepository: IModulesRepository
) => async (id: string) => {
    return modulesRepository.getModuleById(id);
}