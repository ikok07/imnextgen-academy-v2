import {
    IUserBoughtModulesRepository
} from "@/src/application/repositories/payments/user-bought-modules.repository.interface";

export type IRemoveUserBoughtModuleUseCase = ReturnType<typeof removeUserBoughtModuleUseCase>;

export const removeUserBoughtModuleUseCase = (
    userBoughtModulesRepository: IUserBoughtModulesRepository
) => (userId: string, moduleId: string) => {
    return userBoughtModulesRepository.removeBoughtModule(userId, moduleId)
}