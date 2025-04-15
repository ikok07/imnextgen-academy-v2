import { IModulesRepository } from "@/src/application/repositories/media/modules/modules.repository.interface";
import {IGetModulesController} from "@/src/interface-adapters/controllers/media/modules/get-modules.controller";
import {IGetModulesUseCase} from "@/src/application/use-cases/media/modules/get-modules.use-case";
import {IGetModuleByIdController} from "@/src/interface-adapters/controllers/media/modules/get-module-by-id.controller";
import {IGetModuleByIdUseCase} from "@/src/application/use-cases/media/modules/get-module-by-id.use-case";
import { ISectionsRepository } from "@/src/application/repositories/media/sections/sections.repository.interface";
import { IGetSectionsForModuleUseCase } from "@/src/application/use-cases/media/sections/get-sections-for-module.use-case";
import { IGetSectionsForModuleController } from "@/src/interface-adapters/controllers/media/sections/get-sections-for-module.controller";

export const CLASSROOM_SECTIONS_SYMBOLS = {
    ISectionsRepository: Symbol.for("ISectionsRepository"),

    IGetSectionsForModuleUseCase: Symbol.for("IGetSectionsForModuleUseCase"),
    IGetSectionsForModuleController: Symbol.for("IGetSectionsForModuleController")
}

export interface CLASSROOM_SECTIONS_RETURN_TYPES {
    ISectionsRepository: ISectionsRepository,

    IGetSectionsForModuleUseCase: IGetSectionsForModuleUseCase,
    IGetSectionsForModuleController: IGetSectionsForModuleController
}