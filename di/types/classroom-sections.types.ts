import { IModulesRepository } from "@/src/application/repositories/media/modules/modules.repository.interface";
import {IGetModulesController} from "@/src/interface-adapters/controllers/media/modules/get-modules.controller";
import {IGetModulesUseCase} from "@/src/application/use-cases/media/modules/get-modules.use-case";
import {IGetModuleByIdController} from "@/src/interface-adapters/controllers/media/modules/get-module-by-id.controller";
import {IGetModuleByIdUseCase} from "@/src/application/use-cases/media/modules/get-module-by-id.use-case";
import { ISectionsRepository } from "@/src/application/repositories/media/sections/sections.repository.interface";
import { IGetSectionsForModuleUseCase } from "@/src/application/use-cases/media/sections/get-sections-for-module.use-case";
import { IGetSectionsForModuleController } from "@/src/interface-adapters/controllers/media/sections/get-sections-for-module.controller";
import { IGetSectionByIdController } from "@/src/interface-adapters/controllers/media/sections/get-section-by-id.controller";
import {IGetSectionByIdUseCase} from "@/src/application/use-cases/media/sections/get-section-by-id.use-case";
import { ICreateSectionController } from "@/src/interface-adapters/controllers/media/sections/create-section.controller";
import {ICreateSectionUseCase} from "@/src/application/use-cases/media/sections/create-section.use-case";
import {IUpdateSectionController} from "@/src/interface-adapters/controllers/media/sections/update-section.controller";
import {IUpdateSectionUseCase} from "@/src/application/use-cases/media/sections/update-section.use-case";
import {IDeleteSectionController} from "@/src/interface-adapters/controllers/media/sections/delete-section.controller";
import {IDeleteSectionUseCase} from "@/src/application/use-cases/media/sections/delete-section.use-case";
import { IDeleteMultipleSectionsController } from "@/src/interface-adapters/controllers/media/sections/delete-multiple-sections.controller";
import {
    IDeleteMultipleSectionsUseCase
} from "@/src/application/use-cases/media/sections/delete-multiple-sections.use-case";

export const CLASSROOM_SECTIONS_SYMBOLS = {
    ISectionsRepository: Symbol.for("ISectionsRepository"),

    IGetSectionByIdUseCase: Symbol.for("IGetSectionByIdUseCase"),
    IGetSectionByIdController: Symbol.for("IGetSectionByIdController"),

    IGetSectionsForModuleUseCase: Symbol.for("IGetSectionsForModuleUseCase"),
    IGetSectionsForModuleController: Symbol.for("IGetSectionsForModuleController"),

    ICreateSectionUseCase: Symbol.for("ICreateSectionUseCase"),
    ICreateSectionController: Symbol.for("ICreateSectionController"),

    IUpdateSectionUseCase: Symbol.for("IUpdateSectionUseCase"),
    IUpdateSectionController: Symbol.for("IUpdateSectionController"),

    IDeleteSectionUseCase: Symbol.for("IDeleteSectionUseCase"),
    IDeleteSectionController: Symbol.for("IDeleteSectionController"),

    IDeleteMultipleSectionsUseCase: Symbol.for("IDeleteMultipleSectionsUseCase"),
    IDeleteMultipleSectionsController: Symbol.for("IDeleteMultipleSectionsController")
}

export interface CLASSROOM_SECTIONS_RETURN_TYPES {
    ISectionsRepository: ISectionsRepository,

    IGetSectionByIdUseCase: IGetSectionByIdUseCase,
    IGetSectionByIdController: IGetSectionByIdController

    IGetSectionsForModuleUseCase: IGetSectionsForModuleUseCase,
    IGetSectionsForModuleController: IGetSectionsForModuleController,

    ICreateSectionUseCase: ICreateSectionUseCase,
    ICreateSectionController: ICreateSectionController,

    IUpdateSectionUseCase: IUpdateSectionUseCase,
    IUpdateSectionController: IUpdateSectionController,

    IDeleteSectionUseCase: IDeleteSectionUseCase,
    IDeleteSectionController: IDeleteSectionController,

    IDeleteMultipleSectionsUseCase: IDeleteMultipleSectionsUseCase,
    IDeleteMultipleSectionsController: IDeleteMultipleSectionsController
}