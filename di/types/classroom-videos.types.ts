import { IFinishedVideosRepository } from "@/src/application/repositories/media/videos/finished-videos.repository.interface"
import { IVideosRepository } from "@/src/application/repositories/media/videos/videos.repository.interface";
import { IGetFinishedVideosUseCase } from "@/src/application/use-cases/media/videos/get-finished-videos.use-case"
import { IGetVideosForModuleUseCase } from "@/src/application/use-cases/media/videos/get-videos-for-module.use-case";
import {
    IGetFinishedVideosController
} from "@/src/interface-adapters/controllers/media/videos/get-finished-videos.controller";
import { IGetVideosForModuleController } from "@/src/interface-adapters/controllers/media/videos/get-videos-for-module.controller";

export const CLASSROOM_VIDEOS_SYMBOLS = {
    IVideosRepository: Symbol.for("IVideosRepository"),

    IGetVideosForModuleUseCase: Symbol.for("IGetVideosForModuleUseCase"),
    IGetVideosForModuleController: Symbol.for("IGetVideosForModuleController")
}

export interface CLASSROOM_VIDEOS_RETURN_TYPES {
    IVideosRepository: IVideosRepository,

    IGetVideosForModuleUseCase: IGetVideosForModuleUseCase,
    IGetVideosForModuleController: IGetVideosForModuleController
}