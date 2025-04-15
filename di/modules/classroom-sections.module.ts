import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {SectionsRepository} from "@/src/infrastructure/repositories/media/sections/sections.repository";
import {getSectionsForModuleUseCase} from "@/src/application/use-cases/media/sections/get-sections-for-module.use-case";
import {
    getSectionsForModuleController
} from "@/src/interface-adapters/controllers/media/sections/get-sections-for-module.controller";

export function createClassroomSectionsModule() {
    const classroomSectionsModule = createModule();

    classroomSectionsModule
        .bind(DI_SYMBOLS.ISectionsRepository)
        .toClass(SectionsRepository);

    classroomSectionsModule
        .bind(DI_SYMBOLS.IGetSectionsForModuleUseCase)
        .toHigherOrderFunction(getSectionsForModuleUseCase, [DI_SYMBOLS.ISectionsRepository]);

    classroomSectionsModule
        .bind(DI_SYMBOLS.IGetSectionsForModuleController)
        .toHigherOrderFunction(getSectionsForModuleController, [DI_SYMBOLS.IGetSectionsForModuleUseCase]);

    return classroomSectionsModule;
}