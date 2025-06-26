import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {SectionsRepository} from "@/src/infrastructure/repositories/media/sections/sections.repository";
import {getSectionsForModuleUseCase} from "@/src/application/use-cases/media/sections/get-sections-for-module.use-case";
import {
    getSectionsForModuleController
} from "@/src/interface-adapters/controllers/media/sections/get-sections-for-module.controller";
import {getSectionByIdUseCase} from "@/src/application/use-cases/media/sections/get-section-by-id.use-case";
import {
    getSectionByIdController
} from "@/src/interface-adapters/controllers/media/sections/get-section-by-id.controller";
import {createSectionUseCase} from "@/src/application/use-cases/media/sections/create-section.use-case";
import {createSectionController} from "@/src/interface-adapters/controllers/media/sections/create-section.controller";
import {updateSectionController} from "@/src/interface-adapters/controllers/media/sections/update-section.controller";
import {updateSectionUseCase} from "@/src/application/use-cases/media/sections/update-section.use-case";
import {deleteSectionUseCase} from "@/src/application/use-cases/media/sections/delete-section.use-case";
import {deleteSectionController} from "@/src/interface-adapters/controllers/media/sections/delete-section.controller";
import {
    deleteMultipleSectionsUseCase
} from "@/src/application/use-cases/media/sections/delete-multiple-sections.use-case";
import {
    deleteMultipleSectionsController
} from "@/src/interface-adapters/controllers/media/sections/delete-multiple-sections.controller";

export function createClassroomSectionsModule() {
    const classroomSectionsModule = createModule();

    classroomSectionsModule
        .bind(DI_SYMBOLS.ISectionsRepository)
        .toClass(SectionsRepository);

    classroomSectionsModule
        .bind(DI_SYMBOLS.IGetSectionByIdUseCase)
        .toHigherOrderFunction(getSectionByIdUseCase, [DI_SYMBOLS.ISectionsRepository]);

    classroomSectionsModule
        .bind(DI_SYMBOLS.IGetSectionByIdController)
        .toHigherOrderFunction(getSectionByIdController, [DI_SYMBOLS.IGetSectionByIdUseCase]);

    classroomSectionsModule
        .bind(DI_SYMBOLS.IGetSectionsForModuleUseCase)
        .toHigherOrderFunction(getSectionsForModuleUseCase, [DI_SYMBOLS.ISectionsRepository]);

    classroomSectionsModule
        .bind(DI_SYMBOLS.IGetSectionsForModuleController)
        .toHigherOrderFunction(getSectionsForModuleController, [DI_SYMBOLS.IGetSectionsForModuleUseCase]);

    classroomSectionsModule
        .bind(DI_SYMBOLS.ICreateSectionUseCase)
        .toHigherOrderFunction(createSectionUseCase, [DI_SYMBOLS.ISectionsRepository]);

    classroomSectionsModule
        .bind(DI_SYMBOLS.ICreateSectionController)
        .toHigherOrderFunction(createSectionController, [DI_SYMBOLS.ICreateSectionUseCase]);

    classroomSectionsModule
        .bind(DI_SYMBOLS.IUpdateSectionUseCase)
        .toHigherOrderFunction(updateSectionUseCase, [DI_SYMBOLS.ISectionsRepository]);

    classroomSectionsModule
        .bind(DI_SYMBOLS.IUpdateSectionController)
        .toHigherOrderFunction(updateSectionController, [DI_SYMBOLS.IUpdateSectionUseCase]);

    classroomSectionsModule
        .bind(DI_SYMBOLS.IDeleteSectionUseCase)
        .toHigherOrderFunction(deleteSectionUseCase, [DI_SYMBOLS.ISectionsRepository]);

    classroomSectionsModule
        .bind(DI_SYMBOLS.IDeleteSectionController)
        .toHigherOrderFunction(deleteSectionController, [DI_SYMBOLS.IDeleteSectionUseCase]);

    classroomSectionsModule
        .bind(DI_SYMBOLS.IDeleteMultipleSectionsUseCase)
        .toHigherOrderFunction(deleteMultipleSectionsUseCase, [DI_SYMBOLS.ISectionsRepository]);

    classroomSectionsModule
        .bind(DI_SYMBOLS.IDeleteMultipleSectionsController)
        .toHigherOrderFunction(deleteMultipleSectionsController, [DI_SYMBOLS.IDeleteMultipleSectionsUseCase]);

    return classroomSectionsModule;
}