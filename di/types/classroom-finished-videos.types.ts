import { IFinishedVideosRepository } from "@/src/application/repositories/media/videos/finished-videos.repository.interface"
import { IAddFinishedVideoUseCase } from "@/src/application/use-cases/media/videos/finished-videos/add-finished-video.use-case";
import { IGetFinishedVideosUseCase } from "@/src/application/use-cases/media/videos/finished-videos/get-finished-videos.use-case"
import {
    IGetFinishedVideosController
} from "@/src/interface-adapters/controllers/media/videos/finished-videos/get-finished-videos.controller";
import {
    IAddFinishedVideoController
} from "@/src/interface-adapters/controllers/media/videos/finished-videos/add-finished-video.controller";
import { IRemoveFinishedVideoUseCase } from "@/src/application/use-cases/media/videos/finished-videos/remove-finished-video.use-case";
import {
    IRemoveFinishedVideoController
} from "@/src/interface-adapters/controllers/media/videos/finished-videos/remove-finished-video.controller";
import { ICheckFinishedVideoController } from "@/src/interface-adapters/controllers/media/videos/finished-videos/check-finished-video.controller";
import { ICheckFinishedVideoUseCase } from "@/src/application/use-cases/media/videos/finished-videos/check-finished-video.use-case";
import { IGetFinishedVideosForSectionUseCase } from "@/src/application/use-cases/media/videos/finished-videos/get-finished-videos-for-section.use-case";
import { IGetFinishedVideosForSectionController } from "@/src/interface-adapters/controllers/media/videos/finished-videos/get-finished-videos-for-section.controller";
import {
    IGetFinishedVideosForAllSectionsInModuleController
} from "@/src/interface-adapters/controllers/media/videos/finished-videos/get-finished-videos-for-all-sections-in-module.controller";
import {
    IGetFinishedVideosForAllSectionsInModuleUseCase
} from "@/src/application/use-cases/media/videos/finished-videos/get-finished-videos-for-all-sections-in-module.use-case";

export const CLASSROOM_FINISHED_VIDEOS_SYMBOLS = {
    IFinishedVideosRepository: Symbol.for("IFinishedVideosRepository"),

    IGetFinishedVideosUseCase: Symbol.for("IGetFinishedVideosUseCase"),
    IGetFinishedVideosController: Symbol.for("IGetFinishedVideosController"),

    IGetFinishedVideosForAllSectionsInModuleUseCase: Symbol.for("IGetFinishedVideosForAllSectionsInModuleUseCase"),
    IGetFinishedVideosForAllSectionsInModuleController: Symbol.for("IGetFinishedVideosForAllSectionsInModuleController"),

    IGetFinishedVideosForSectionUseCase: Symbol.for("IGetFinishedVideosForSectionUseCase"),
    IGetFinishedVideosForSectionController: Symbol.for("IGetFinishedVideosForSectionController"),

    IAddFinishedVideoUseCase: Symbol.for("IAddFinishedVideoUseCase"),
    IAddFinishedVideoController: Symbol.for("IAddFinishedVideoController"),

    IRemoveFinishedVideoUseCase: Symbol.for("IRemoveFinishedVideoUseCase"),
    IRemoveFinishedVideoController: Symbol.for("IRemoveFinishedVideoController"),

    ICheckFinishedVideoUseCase: Symbol.for("ICheckFinishedVideoUseCase"),
    ICheckFinishedVideoController: Symbol.for("ICheckFinishedVideoController")
}

export interface CLASSROOM_FINISHED_VIDEOS_RETURN_TYPES {
    IFinishedVideosRepository: IFinishedVideosRepository,

    IGetFinishedVideosUseCase: IGetFinishedVideosUseCase,
    IGetFinishedVideosController: IGetFinishedVideosController,

    IGetFinishedVideosForAllSectionsInModuleUseCase: IGetFinishedVideosForAllSectionsInModuleUseCase,
    IGetFinishedVideosForAllSectionsInModuleController: IGetFinishedVideosForAllSectionsInModuleController

    IGetFinishedVideosForSectionUseCase: IGetFinishedVideosForSectionUseCase,
    IGetFinishedVideosForSectionController: IGetFinishedVideosForSectionController,

    IAddFinishedVideoUseCase: IAddFinishedVideoUseCase,
    IAddFinishedVideoController: IAddFinishedVideoController,

    IRemoveFinishedVideoUseCase: IRemoveFinishedVideoUseCase,
    IRemoveFinishedVideoController: IRemoveFinishedVideoController,

    ICheckFinishedVideoUseCase: ICheckFinishedVideoUseCase,
    ICheckFinishedVideoController: ICheckFinishedVideoController
}