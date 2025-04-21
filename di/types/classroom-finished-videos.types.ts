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

export const CLASSROOM_FINISHED_VIDEOS_SYMBOLS = {
    IFinishedVideosRepository: Symbol.for("IFinishedVideosRepository"),

    IGetFinishedVideosUseCase: Symbol.for("IGetFinishedVideosUseCase"),
    IGetFinishedVideosController: Symbol.for("IGetFinishedVideosController"),

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

    IAddFinishedVideoUseCase: IAddFinishedVideoUseCase,
    IAddFinishedVideoController: IAddFinishedVideoController,

    IRemoveFinishedVideoUseCase: IRemoveFinishedVideoUseCase,
    IRemoveFinishedVideoController: IRemoveFinishedVideoController,

    ICheckFinishedVideoUseCase: ICheckFinishedVideoUseCase,
    ICheckFinishedVideoController: ICheckFinishedVideoController
}