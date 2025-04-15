import { IVideosRepository } from "@/src/application/repositories/media/videos/videos.repository.interface";
import { IGetVideoByIdUseCase } from "@/src/application/use-cases/media/videos/get-video-by-id.use-case";
import { IGetVideosForModuleUseCase } from "@/src/application/use-cases/media/videos/get-videos-for-module.use-case";
import { IGetVideosForSectionUseCase } from "@/src/application/use-cases/media/videos/get-videos-for-section.use-case";
import { IGetVideosForModuleController } from "@/src/interface-adapters/controllers/media/videos/get-videos-for-module.controller";
import { IGetVideosForSectionController } from "@/src/interface-adapters/controllers/media/videos/get-videos-for-section.controller";
import {IGetVideoByIdController} from "@/src/interface-adapters/controllers/media/videos/get-video-by-id.controller";

export const CLASSROOM_VIDEOS_SYMBOLS = {
    IVideosRepository: Symbol.for("IVideosRepository"),

    IGetVideosForModuleUseCase: Symbol.for("IGetVideosForModuleUseCase"),
    IGetVideosForModuleController: Symbol.for("IGetVideosForModuleController"),

    IGetVideosForSectionUseCase: Symbol.for("IGetVideosForSectionUseCase"),
    IGetVideosForSectionController: Symbol.for("IGetVideosForSectionController"),

    IGetVideoByIdUseCase: Symbol.for("IGetVideoByIdUseCase"),
    IGetVideoByIdController: Symbol.for("IGetVideoByIdController")
}

export interface CLASSROOM_VIDEOS_RETURN_TYPES {
    IVideosRepository: IVideosRepository,

    IGetVideosForModuleUseCase: IGetVideosForModuleUseCase,
    IGetVideosForModuleController: IGetVideosForModuleController,

    IGetVideosForSectionUseCase: IGetVideosForSectionUseCase,
    IGetVideosForSectionController: IGetVideosForSectionController,

    IGetVideoByIdUseCase: IGetVideoByIdUseCase,
    IGetVideoByIdController: IGetVideoByIdController
}