import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {UserBoughtModulesRepository} from "@/src/infrastructure/repositories/payments/user-bought-modules.repository";
import {
    getUserBoughtModulesUseCase
} from "@/src/application/use-cases/payments/user-bought-modules/get-user-bought-modules.use-case";
import { addUserBoughtModulesUseCase } from "@/src/application/use-cases/payments/user-bought-modules/add-user-bought-modules.use-case";
import {
    removeUserBoughtModuleUseCase
} from "@/src/application/use-cases/payments/user-bought-modules/remove-user-bought-module.use-case";
import {
    removeUserBoughtModuleController
} from "@/src/interface-adapters/controllers/payments/user-bought-modules/remove-user-bought-module.controller";
import {
    addUserBoughtModulesController
} from "@/src/interface-adapters/controllers/payments/user-bought-modules/add-user-bought-modules.controller";
import {
    getUserBoughtModulesController
} from "@/src/interface-adapters/controllers/payments/user-bought-modules/get-user-bought-modules.controller";

export function createUserBoughtModulesModule() {
    const userBoughtModulesModule = createModule();

    userBoughtModulesModule
        .bind(DI_SYMBOLS.IUserBoughtModulesRepository)
        .toClass(UserBoughtModulesRepository);

    userBoughtModulesModule
        .bind(DI_SYMBOLS.IGetUserBoughtModulesUseCase)
        .toHigherOrderFunction(getUserBoughtModulesUseCase, [DI_SYMBOLS.IUserBoughtModulesRepository]);

    userBoughtModulesModule
        .bind(DI_SYMBOLS.IGetUserBoughtModulesController)
        .toHigherOrderFunction(getUserBoughtModulesController, [DI_SYMBOLS.IGetUserBoughtModulesUseCase]);

    userBoughtModulesModule
        .bind(DI_SYMBOLS.IAddUserBoughtModulesUseCase)
        .toHigherOrderFunction(addUserBoughtModulesUseCase, [DI_SYMBOLS.IUserBoughtModulesRepository]);

    userBoughtModulesModule
        .bind(DI_SYMBOLS.IAddUserBoughtModulesController)
        .toHigherOrderFunction(addUserBoughtModulesController, [DI_SYMBOLS.IAddUserBoughtModulesUseCase]);

    userBoughtModulesModule
        .bind(DI_SYMBOLS.IRemoveUserBoughtModuleController)
        .toHigherOrderFunction(removeUserBoughtModuleController, [DI_SYMBOLS.IRemoveUserBoughtModuleUseCase]);

    userBoughtModulesModule
        .bind(DI_SYMBOLS.IRemoveUserBoughtModuleUseCase)
        .toHigherOrderFunction(removeUserBoughtModuleUseCase, [DI_SYMBOLS.IUserBoughtModulesRepository]);

    return userBoughtModulesModule;
}