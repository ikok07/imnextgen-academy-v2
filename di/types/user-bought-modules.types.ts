import { IUserBoughtModulesRepository } from "@/src/application/repositories/payments/user-bought-modules.repository.interface"
import {
    IGetUserBoughtModulesUseCase
} from "@/src/application/use-cases/payments/user-bought-modules/get-user-bought-modules.use-case";
import {
    IGetUserBoughtModulesController
} from "@/src/interface-adapters/controllers/payments/user-bought-modules/get-user-bought-modules.controller";
import {
    IAddUserBoughtModuleController
} from "@/src/interface-adapters/controllers/payments/user-bought-modules/add-user-bought-module.controller";
import {
    IAddUserBoughtModuleUseCase
} from "@/src/application/use-cases/payments/user-bought-modules/add-user-bought-module.use-case";
import { IRemoveUserBoughtModuleUseCase } from "@/src/application/use-cases/payments/user-bought-modules/remove-user-bought-module.use-case";
import { IRemoveUserBoughtModuleController } from "@/src/interface-adapters/controllers/payments/user-bought-modules/remove-user-bought-module.controller";

export const USER_BOUGHT_MODULES_SYMBOLS = {
    IUserBoughtModulesRepository: Symbol.for("IUserBoughtModulesRepository"),

    IGetUserBoughtModulesUseCase: Symbol.for("IGetUserBoughtModulesUseCase"),
    IGetUserBoughtModulesController: Symbol.for("IGetUserBoughtModulesController"),

    IAddUserBoughtModuleUseCase: Symbol.for("IAddUserBoughtModuleUseCase"),
    IAddUserBoughtModuleController: Symbol.for("IAddUserBoughtModuleController"),

    IRemoveUserBoughtModuleUseCase: Symbol.for("IRemoveUserBoughtModuleUseCase"),
    IRemoveUserBoughtModuleController: Symbol.for("IRemoveUserBoughtModuleController")
}

export interface USER_BOUGHT_MODULES_RETURN_TYPES {
    IUserBoughtModulesRepository: IUserBoughtModulesRepository,

    IGetUserBoughtModulesUseCase: IGetUserBoughtModulesUseCase,
    IGetUserBoughtModulesController: IGetUserBoughtModulesController,

    IAddUserBoughtModuleUseCase: IAddUserBoughtModuleUseCase,
    IAddUserBoughtModuleController: IAddUserBoughtModuleController,

    IRemoveUserBoughtModuleUseCase: IRemoveUserBoughtModuleUseCase,
    IRemoveUserBoughtModuleController: IRemoveUserBoughtModuleController
}


