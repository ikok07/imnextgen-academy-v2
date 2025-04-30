import { IModulesRepository } from "@/src/application/repositories/media/modules/modules.repository.interface";
import {IGetModulesController} from "@/src/interface-adapters/controllers/media/modules/get-modules.controller";
import {IGetModulesUseCase} from "@/src/application/use-cases/media/modules/get-modules.use-case";
import {IGetModuleByIdController} from "@/src/interface-adapters/controllers/media/modules/get-module-by-id.controller";
import {IGetModuleByIdUseCase} from "@/src/application/use-cases/media/modules/get-module-by-id.use-case";
import { IGetPaidModulesUseCase } from "@/src/application/use-cases/media/modules/get-paid-modules.use-case";
import {
    IGetPaidModulesController
} from "@/src/interface-adapters/controllers/media/modules/get-paid-modules.controller";
import { IGetModulesByProductIdsController } from "@/src/interface-adapters/controllers/media/modules/get-modules-by-product-ids.controller";
import {
    IGetModulesByProductIdsUseCase
} from "@/src/application/use-cases/media/modules/get-modules-by-product-ids.use-case";

export const CLASSROOM_MODULES_SYMBOLS = {
    IModulesRepository: Symbol.for("IModulesRepository"),

    IGetModulesUseCase: Symbol.for("IGetModulesUseCase"),
    IGetModulesController: Symbol.for("IGetModulesController"),

    IGetModulesByProductIdsUseCase: Symbol.for("IGetModulesByProductIdsUseCase"),
    IGetModulesByProductIdsController: Symbol.for("IGetModulesByProductIdsController"),

    IGetModuleByIdUseCase: Symbol.for("IGetModuleByIdUseCase"),
    IGetModuleByIdController: Symbol.for("IGetModuleByIdController"),

    IGetPaidModulesUseCase: Symbol.for("IGetPaidModulesUseCase"),
    IGetPaidModulesController: Symbol.for("IGetPaidModulesController")
}

export interface CLASSROOM_MODULES_RETURN_TYPES {
    IModulesRepository: IModulesRepository,

    IGetModulesUseCase: IGetModulesUseCase,
    IGetModulesController: IGetModulesController,

    IGetModulesByProductIdsUseCase: IGetModulesByProductIdsUseCase,
    IGetModulesByProductIdsController: IGetModulesByProductIdsController

    IGetModuleByIdUseCase: IGetModuleByIdUseCase,
    IGetModuleByIdController: IGetModuleByIdController,

    IGetPaidModulesUseCase: IGetPaidModulesUseCase,
    IGetPaidModulesController: IGetPaidModulesController
}