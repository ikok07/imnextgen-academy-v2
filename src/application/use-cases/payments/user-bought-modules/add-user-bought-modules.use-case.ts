import {
    IUserBoughtModulesRepository
} from "@/src/application/repositories/payments/user-bought-modules.repository.interface";

export type IAddUserBoughtModulesUseCase = ReturnType<typeof addUserBoughtModulesUseCase>;

export const addUserBoughtModulesUseCase = (
    userBoughtModulesRepository: IUserBoughtModulesRepository
) => (userId: string, moduleId: string[]) => {
    return userBoughtModulesRepository.addBoughtModules(userId, moduleId)
}