import {
    IUserBoughtModulesRepository
} from "@/src/application/repositories/payments/user-bought-modules.repository.interface";
import {FullBoughtModule} from "@/src/entities/models/media/modules/full-bought-module";

export type IGetUserBoughtModulesUseCase = ReturnType<typeof getUserBoughtModulesUseCase>;

export const getUserBoughtModulesUseCase = (
    userBoughtModulesRepository: IUserBoughtModulesRepository
) => async (userId: string): Promise<FullBoughtModule[]> => {
    const rawResponse = await userBoughtModulesRepository.getBoughtModules(userId);
    return rawResponse.map(obj => ({
        id: obj.bought_module.id,
        profile: obj.profile,
        module: obj.module
    }))
}