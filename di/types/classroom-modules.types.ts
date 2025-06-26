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
import { ICreateModuleController } from "@/src/interface-adapters/controllers/media/modules/create-module.controller";
import {ICreateModuleUseCase} from "@/src/application/use-cases/media/modules/create-module.use-case";
import {IUpdateModuleController} from "@/src/interface-adapters/controllers/media/modules/update-module.controller";
import { IUpdateModuleUseCase } from "@/src/application/use-cases/media/modules/update-module.use-case";
import {IDeleteModuleUseCase} from "@/src/application/use-cases/media/modules/delete-module.use-case";
import {IDeleteModuleController} from "@/src/interface-adapters/controllers/media/modules/delete-module.controller";
import {
    IDeleteMultipleModulesUseCase
} from "@/src/application/use-cases/media/modules/delete-multiple-modules.use-case";
import {
    IDeleteMultipleModulesController
} from "@/src/interface-adapters/controllers/media/modules/delete-multiple-modules.controller";
import {IGetModulesByIdsUseCase} from "@/src/application/use-cases/media/modules/get-modules-by-ids.use-case";
import { IGetModulesByIdsController } from "@/src/interface-adapters/controllers/media/modules/get-modules-by-ids.controller";

export const CLASSROOM_MODULES_SYMBOLS = {
    IModulesRepository: Symbol.for("IModulesRepository"),

    IGetModulesUseCase: Symbol.for("IGetModulesUseCase"),
    IGetModulesController: Symbol.for("IGetModulesController"),

    IGetModulesByProductIdsUseCase: Symbol.for("IGetModulesByProductIdsUseCase"),
    IGetModulesByProductIdsController: Symbol.for("IGetModulesByProductIdsController"),

    IGetModuleByIdUseCase: Symbol.for("IGetModuleByIdUseCase"),
    IGetModuleByIdController: Symbol.for("IGetModuleByIdController"),

    IGetModulesByIdsUseCase: Symbol.for("IGetModulesByIdsUseCase"),
    IGetModulesByIdsController: Symbol.for("IGetModulesByIdsController"),

    IGetPaidModulesUseCase: Symbol.for("IGetPaidModulesUseCase"),
    IGetPaidModulesController: Symbol.for("IGetPaidModulesController"),

    ICreateModuleUseCase: Symbol.for("ICreateModuleUseCase"),
    ICreateModuleController: Symbol.for("ICreateModuleController"),

    IUpdateModuleUseCase: Symbol.for("IUpdateModuleUseCase"),
    IUpdateModuleController: Symbol.for("IUpdateModuleController"),

    IDeleteModuleUseCase: Symbol.for("IDeleteModuleUseCase"),
    IDeleteModuleController: Symbol.for("IDeleteModuleController"),

    IDeleteMultipleModulesUseCase: Symbol.for("IDeleteMultipleModulesUseCase"),
    IDeleteMultipleModulesController: Symbol.for("IDeleteMultipleModulesController")
}

export interface CLASSROOM_MODULES_RETURN_TYPES {
    IModulesRepository: IModulesRepository,

    IGetModulesUseCase: IGetModulesUseCase,
    IGetModulesController: IGetModulesController,

    IGetModulesByProductIdsUseCase: IGetModulesByProductIdsUseCase,
    IGetModulesByProductIdsController: IGetModulesByProductIdsController

    IGetModuleByIdUseCase: IGetModuleByIdUseCase,
    IGetModuleByIdController: IGetModuleByIdController,

    IGetModulesByIdsUseCase: IGetModulesByIdsUseCase,
    IGetModulesByIdsController: IGetModulesByIdsController,

    IGetPaidModulesUseCase: IGetPaidModulesUseCase,
    IGetPaidModulesController: IGetPaidModulesController,

    ICreateModuleUseCase: ICreateModuleUseCase,
    ICreateModuleController: ICreateModuleController,

    IUpdateModuleUseCase: IUpdateModuleUseCase,
    IUpdateModuleController: IUpdateModuleController,

    IDeleteModuleUseCase: IDeleteModuleUseCase,
    IDeleteModuleController: IDeleteModuleController,

    IDeleteMultipleModulesUseCase: IDeleteMultipleModulesUseCase,
    IDeleteMultipleModulesController: IDeleteMultipleModulesController
}