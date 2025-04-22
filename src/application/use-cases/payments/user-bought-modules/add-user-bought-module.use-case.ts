import {
    IUserBoughtModulesRepository
} from "@/src/application/repositories/payments/user-bought-modules.repository.interface";

export type IAddUserBoughtModuleUseCase = ReturnType<typeof addUserBoughtModuleUseCase>;

export const addUserBoughtModuleUseCase = (
    userBoughtModulesRepository: IUserBoughtModulesRepository
) => (userId: string, moduleId: string) => {
    return userBoughtModulesRepository.addBoughtModule(userId, moduleId)
}