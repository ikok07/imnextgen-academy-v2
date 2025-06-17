import {createModule} from "@evyweb/ioctopus";
import {FinishedVideosRepository} from "@/src/infrastructure/repositories/media/videos/finished-videos.repository";
import {DI_SYMBOLS} from "@/di/types/types";
import {getFinishedVideosUseCase} from "@/src/application/use-cases/media/videos/finished-videos/get-finished-videos.use-case";
import {
    getFinishedVideosController
} from "@/src/interface-adapters/controllers/media/videos/finished-videos/get-finished-videos.controller";
import {addFinishedVideoUseCase} from "@/src/application/use-cases/media/videos/finished-videos/add-finished-video.use-case";
import {
    addFinishedVideoController
} from "@/src/interface-adapters/controllers/media/videos/finished-videos/add-finished-video.controller";
import {removeFinishedVideoUseCase} from "@/src/application/use-cases/media/videos/finished-videos/remove-finished-video.use-case";
import {
    removeFinishedVideoController
} from "@/src/interface-adapters/controllers/media/videos/finished-videos/remove-finished-video.controller";
import {checkFinishedVideoUseCase} from "@/src/application/use-cases/media/videos/finished-videos/check-finished-video.use-case";
import {
    checkFinishedVideoController
} from "@/src/interface-adapters/controllers/media/videos/finished-videos/check-finished-video.controller";
import {
    getFinishedVideosForSectionUseCase
} from "@/src/application/use-cases/media/videos/finished-videos/get-finished-videos-for-section.use-case";
import {
    getFinishedVideosForSectionController
} from "@/src/interface-adapters/controllers/media/videos/finished-videos/get-finished-videos-for-section.controller";
import {
    getFinishedVideosForAllSectionsInModuleUseCase
} from "@/src/application/use-cases/media/videos/finished-videos/get-finished-videos-for-all-sections-in-module.use-case";
import {
    getFinishedVideosForAllSectionsInModuleController
} from "@/src/interface-adapters/controllers/media/videos/finished-videos/get-finished-videos-for-all-sections-in-module.controller";

export function createClassroomFinishedVideosModule() {
    const classroomFinishedVideosModule = createModule();

    classroomFinishedVideosModule
        .bind(DI_SYMBOLS.IFinishedVideosRepository)
        .toClass(FinishedVideosRepository);

    classroomFinishedVideosModule
        .bind(DI_SYMBOLS.IGetFinishedVideosUseCase)
        .toHigherOrderFunction(getFinishedVideosUseCase, [DI_SYMBOLS.IFinishedVideosRepository]);

    classroomFinishedVideosModule
        .bind(DI_SYMBOLS.IGetFinishedVideosController)
        .toHigherOrderFunction(getFinishedVideosController, [DI_SYMBOLS.IGetFinishedVideosUseCase]);

    classroomFinishedVideosModule
        .bind(DI_SYMBOLS.IGetFinishedVideosForAllSectionsInModuleUseCase)
        .toHigherOrderFunction(getFinishedVideosForAllSectionsInModuleUseCase, [DI_SYMBOLS.IFinishedVideosRepository]);

    classroomFinishedVideosModule
        .bind(DI_SYMBOLS.IGetFinishedVideosForAllSectionsInModuleController)
        .toHigherOrderFunction(getFinishedVideosForAllSectionsInModuleController, [DI_SYMBOLS.IGetFinishedVideosForAllSectionsInModuleUseCase]);

    classroomFinishedVideosModule
        .bind(DI_SYMBOLS.IGetFinishedVideosForSectionUseCase)
        .toHigherOrderFunction(getFinishedVideosForSectionUseCase, [DI_SYMBOLS.IFinishedVideosRepository]);

    classroomFinishedVideosModule
        .bind(DI_SYMBOLS.IGetFinishedVideosForSectionController)
        .toHigherOrderFunction(getFinishedVideosForSectionController, [DI_SYMBOLS.IGetFinishedVideosForSectionUseCase]);

    classroomFinishedVideosModule
        .bind(DI_SYMBOLS.IAddFinishedVideoUseCase)
        .toHigherOrderFunction(addFinishedVideoUseCase, [DI_SYMBOLS.IFinishedVideosRepository]);

    classroomFinishedVideosModule
        .bind(DI_SYMBOLS.IAddFinishedVideoController)
        .toHigherOrderFunction(addFinishedVideoController, [DI_SYMBOLS.IAddFinishedVideoUseCase]);

    classroomFinishedVideosModule
        .bind(DI_SYMBOLS.IRemoveFinishedVideoUseCase)
        .toHigherOrderFunction(removeFinishedVideoUseCase, [DI_SYMBOLS.IFinishedVideosRepository]);

    classroomFinishedVideosModule
        .bind(DI_SYMBOLS.IRemoveFinishedVideoController)
        .toHigherOrderFunction(removeFinishedVideoController, [DI_SYMBOLS.IRemoveFinishedVideoUseCase]);

    classroomFinishedVideosModule
        .bind(DI_SYMBOLS.ICheckFinishedVideoUseCase)
        .toHigherOrderFunction(checkFinishedVideoUseCase, [DI_SYMBOLS.IFinishedVideosRepository]);

    classroomFinishedVideosModule
        .bind(DI_SYMBOLS.ICheckFinishedVideoController)
        .toHigherOrderFunction(checkFinishedVideoController, [DI_SYMBOLS.ICheckFinishedVideoUseCase]);

    return classroomFinishedVideosModule;
}