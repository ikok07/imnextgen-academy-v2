import { IModulesRepository } from "@/src/application/repositories/media/modules/modules.repository.interface";
import {IGetModulesController} from "@/src/interface-adapters/controllers/media/modules/get-modules.controller";
import {IGetModulesUseCase} from "@/src/application/use-cases/media/modules/get-modules.use-case";
import {IGetModuleByIdController} from "@/src/interface-adapters/controllers/media/modules/get-module-by-id.controller";
import {IGetModuleByIdUseCase} from "@/src/application/use-cases/media/modules/get-module-by-id.use-case";

export const CLASSROOM_MODULES_SYMBOLS = {
    IModulesRepository: Symbol.for("IModulesRepository"),

    IGetModulesUseCase: Symbol.for("IGetModulesUseCase"),
    IGetModulesController: Symbol.for("IGetModulesController"),

    IGetModuleByIdUseCase: Symbol.for("IGetModuleByIdUseCase"),
    IGetModuleByIdController: Symbol.for("IGetModuleByIdController")
}

export interface CLASSROOM_MODULES_RETURN_TYPES {
    IModulesRepository: IModulesRepository,

    IGetModulesUseCase: IGetModulesUseCase,
    IGetModulesController: IGetModulesController,

    IGetModuleByIdUseCase: IGetModuleByIdUseCase,
    IGetModuleByIdController: IGetModuleByIdController
}