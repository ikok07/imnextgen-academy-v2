import {
    IUserBoughtModulesRepository
} from "@/src/application/repositories/payments/user-bought-modules.repository.interface";

export type IGetUserBoughtModulesUseCase = ReturnType<typeof getUserBoughtModulesUseCase>;

export const getUserBoughtModulesUseCase = (
    userBoughtModulesRepository: IUserBoughtModulesRepository
) => (userId: string) => {
    return userBoughtModulesRepository.getBoughtModules(userId);
}