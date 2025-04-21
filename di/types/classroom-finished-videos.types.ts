import { IFinishedVideosRepository } from "@/src/application/repositories/media/videos/finished-videos.repository.interface"
import { IAddFinishedVideoUseCase } from "@/src/application/use-cases/media/videos/add-finished-video.use-case";
import { IGetFinishedVideosUseCase } from "@/src/application/use-cases/media/videos/get-finished-videos.use-case"
import {
    IGetFinishedVideosController
} from "@/src/interface-adapters/controllers/media/videos/get-finished-videos.controller";
import {
    IAddFinishedVideoController
} from "@/src/interface-adapters/controllers/media/videos/add-finished-video.controller";

export const CLASSROOM_FINISHED_VIDEOS_SYMBOLS = {
    IFinishedVideosRepository: Symbol.for("IFinishedVideosRepository"),

    IGetFinishedVideosUseCase: Symbol.for("IGetFinishedVideosUseCase"),
    IGetFinishedVideosController: Symbol.for("IGetFinishedVideosController"),

    IAddFinishedVideoUseCase: Symbol.for("IAddFinishedVideoUseCase"),
    IAddFinishedVideoController: Symbol.for("IAddFinishedVideoController")
}

export interface CLASSROOM_FINISHED_VIDEOS_RETURN_TYPES {
    IFinishedVideosRepository: IFinishedVideosRepository,

    IGetFinishedVideosUseCase: IGetFinishedVideosUseCase,
    IGetFinishedVideosController: IGetFinishedVideosController,

    IAddFinishedVideoUseCase: IAddFinishedVideoUseCase,
    IAddFinishedVideoController: IAddFinishedVideoController
}