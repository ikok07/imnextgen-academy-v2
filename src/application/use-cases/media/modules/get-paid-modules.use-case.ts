import {IModulesRepository} from "@/src/application/repositories/media/modules/modules.repository.interface";

export type IGetPaidModulesUseCase = ReturnType<typeof getPaidModulesUseCase>;

export const getPaidModulesUseCase = (
    modulesRepository: IModulesRepository
) => async () => {
    return modulesRepository.getPaidModules();
}