import { IVideosRepository } from "@/src/application/repositories/media/videos/videos.repository.interface";
import { IGetVideoByIdUseCase } from "@/src/application/use-cases/media/videos/get-video-by-id.use-case";
import { IGetVideosForModuleUseCase } from "@/src/application/use-cases/media/videos/get-videos-for-module.use-case";
import { IGetVideosForSectionUseCase } from "@/src/application/use-cases/media/videos/get-videos-for-section.use-case";
import { IGetVideosForModuleController } from "@/src/interface-adapters/controllers/media/videos/get-videos-for-module.controller";
import { IGetVideosForSectionController } from "@/src/interface-adapters/controllers/media/videos/get-videos-for-section.controller";
import {IGetVideoByIdController} from "@/src/interface-adapters/controllers/media/videos/get-video-by-id.controller";
import {IGetSignedTokensController} from "@/src/interface-adapters/controllers/media/videos/get-signed-tokens.controller";
import {IGetSignedTokensUseCase,} from "@/src/application/use-cases/media/videos/get-signed-tokens.use-case";
import {IVideosService} from "@/src/application/services/media/videos/videos.service.interface";
import {
    IVideoProgressesRepository
} from "@/src/application/repositories/media/videos/video-progresses.repository.interface";
import {
    IGetVideoProgressesForModuleUseCase
} from "@/src/application/use-cases/media/videos/video-progresses/get-video-progresses-for-module.use-case";
import {
    IGetVideoProgressesForModuleController
} from "@/src/interface-adapters/controllers/media/videos/video-progresses/get-video-progresses-for-module.controller";
import {
    IGetVideoProgressesForSectionUseCase
} from "@/src/application/use-cases/media/videos/video-progresses/get-video-progresses-for-section.use-case";
import {
    IGetVideoProgressesForSectionController
} from "@/src/interface-adapters/controllers/media/videos/video-progresses/get-video-progresses-for-section.controller";
import {
    ISetVideoProgressUseCase
} from "@/src/application/use-cases/media/videos/video-progresses/set-video-progress.use-case";
import { ISetVideoProgressController } from "@/src/interface-adapters/controllers/media/videos/video-progresses/set-video-progress.controller";

export const CLASSROOM_VIDEOS_SYMBOLS = {
    IVideosService: Symbol.for("IVideosService"),
    IVideosRepository: Symbol.for("IVideosRepository"),

    IGetVideosForModuleUseCase: Symbol.for("IGetVideosForModuleUseCase"),
    IGetVideosForModuleController: Symbol.for("IGetVideosForModuleController"),

    IGetVideosForSectionUseCase: Symbol.for("IGetVideosForSectionUseCase"),
    IGetVideosForSectionController: Symbol.for("IGetVideosForSectionController"),

    IGetVideoByIdUseCase: Symbol.for("IGetVideoByIdUseCase"),
    IGetVideoByIdController: Symbol.for("IGetVideoByIdController"),

    IGetSignedTokensUseCase: Symbol.for("IGetSignedTokensUseCase"),
    IGetSignedTokensController: Symbol.for("IGetSignedTokensController"),

    IVideoProgressesRepository: Symbol.for("IVideoProgressesRepository"),

    IGetVideoProgressesForModuleUseCase: Symbol.for("IGetVideoProgressesForModuleUseCase"),
    IGetVideoProgressesForModuleController: Symbol.for("IGetVideoProgressesForModuleController"),

    IGetVideoProgressesForSectionUseCase: Symbol.for("IGetVideoProgressesForSectionUseCase"),
    IGetVideoProgressesForSectionController: Symbol.for("IGetVideoProgressesForSectionController"),

    ISetVideoProgressUseCase: Symbol.for("ISetVideoProgressUseCase"),
    ISetVideoProgressController: Symbol.for("ISetVideoProgressController")
}

export interface CLASSROOM_VIDEOS_RETURN_TYPES {
    IVideosService: IVideosService,
    IVideosRepository: IVideosRepository,

    IGetVideosForModuleUseCase: IGetVideosForModuleUseCase,
    IGetVideosForModuleController: IGetVideosForModuleController,

    IGetVideosForSectionUseCase: IGetVideosForSectionUseCase,
    IGetVideosForSectionController: IGetVideosForSectionController,

    IGetVideoByIdUseCase: IGetVideoByIdUseCase,
    IGetVideoByIdController: IGetVideoByIdController,

    IGetSignedTokensUseCase: IGetSignedTokensUseCase,
    IGetSignedTokensController: IGetSignedTokensController,

    IVideoProgressesRepository: IVideoProgressesRepository,

    IGetVideoProgressesForModuleUseCase: IGetVideoProgressesForModuleUseCase,
    IGetVideoProgressesForModuleController: IGetVideoProgressesForModuleController,

    IGetVideoProgressesForSectionUseCase: IGetVideoProgressesForSectionUseCase,
    IGetVideoProgressesForSectionController: IGetVideoProgressesForSectionController,

    ISetVideoProgressUseCase: ISetVideoProgressUseCase,
    ISetVideoProgressController: ISetVideoProgressController
}