import {createModule} from "@evyweb/ioctopus";
import {VideosRepository} from "@/src/infrastructure/repositories/media/videos/videos.repository";
import {DI_SYMBOLS} from "@/di/types/types";
import {getVideosForModuleUseCase} from "@/src/application/use-cases/media/videos/get-videos-for-module.use-case";
import {
    getVideosForModuleController
} from "@/src/interface-adapters/controllers/media/videos/get-videos-for-module.controller";
import {getVideosForSectionUseCase} from "@/src/application/use-cases/media/videos/get-videos-for-section.use-case";
import {
    getVideosForSectionController
} from "@/src/interface-adapters/controllers/media/videos/get-videos-for-section.controller";
import {getVideoByIdUseCase} from "@/src/application/use-cases/media/videos/get-video-by-id.use-case";
import {getVideoByIdController} from "@/src/interface-adapters/controllers/media/videos/get-video-by-id.controller";
import {IVideosService} from "@/src/application/services/media/videos/videos.service.interface";
import {MuxService} from "@/src/infrastructure/services/media/videos/mux.service";
import {
    getSignedTokensController
} from "@/src/interface-adapters/controllers/media/videos/get-signed-tokens.controller";
import {getSignedTokensUrlUseCase} from "@/src/application/use-cases/media/videos/get-signed-tokens.use-case";
import {VideoProgressesRepository} from "@/src/infrastructure/repositories/media/videos/video-progresses.repository";
import {
    getVideoProgressesForModuleUseCase
} from "@/src/application/use-cases/media/videos/video-progresses/get-video-progresses-for-module.use-case";
import {
    getVideoProgressesForModuleController
} from "@/src/interface-adapters/controllers/media/videos/video-progresses/get-video-progresses-for-module.controller";
import {
    getVideoProgressesForSectionUseCase
} from "@/src/application/use-cases/media/videos/video-progresses/get-video-progresses-for-section.use-case";
import {
    getVideoProgressesForSectionController
} from "@/src/interface-adapters/controllers/media/videos/video-progresses/get-video-progresses-for-section.controller";

export function createVideosModule() {
    const videosModule = createModule();

    videosModule
        .bind(DI_SYMBOLS.IVideosRepository)
        .toClass(VideosRepository);

    videosModule
        .bind(DI_SYMBOLS.IVideosService)
        .toClass(MuxService);

    videosModule
        .bind(DI_SYMBOLS.IGetVideosForModuleUseCase)
        .toHigherOrderFunction(getVideosForModuleUseCase, [DI_SYMBOLS.IVideosRepository]);

    videosModule
        .bind(DI_SYMBOLS.IGetVideosForModuleController)
        .toHigherOrderFunction(getVideosForModuleController, [DI_SYMBOLS.IGetVideosForModuleUseCase])

    videosModule
        .bind(DI_SYMBOLS.IGetVideosForSectionUseCase)
        .toHigherOrderFunction(getVideosForSectionUseCase, [DI_SYMBOLS.IVideosRepository]);

    videosModule
        .bind(DI_SYMBOLS.IGetVideosForSectionController)
        .toHigherOrderFunction(getVideosForSectionController, [DI_SYMBOLS.IGetVideosForSectionUseCase]);

    videosModule
        .bind(DI_SYMBOLS.IGetVideoByIdUseCase)
        .toHigherOrderFunction(getVideoByIdUseCase, [DI_SYMBOLS.IVideosRepository]);

    videosModule
        .bind(DI_SYMBOLS.IGetVideoByIdController)
        .toHigherOrderFunction(getVideoByIdController, [DI_SYMBOLS.IGetVideoByIdUseCase]);

    videosModule
        .bind(DI_SYMBOLS.IGetSignedTokensUseCase)
        .toHigherOrderFunction(getSignedTokensUrlUseCase, [DI_SYMBOLS.IVideosService]);

    videosModule
        .bind(DI_SYMBOLS.IGetSignedTokensController)
        .toHigherOrderFunction(getSignedTokensController, [DI_SYMBOLS.IGetSignedTokensUseCase]);

    videosModule
        .bind(DI_SYMBOLS.IVideoProgressesRepository)
        .toClass(VideoProgressesRepository);

    videosModule
        .bind(DI_SYMBOLS.IGetVideoProgressesForModuleUseCase)
        .toHigherOrderFunction(getVideoProgressesForModuleUseCase, [DI_SYMBOLS.IVideoProgressesRepository]);

    videosModule
        .bind(DI_SYMBOLS.IGetVideoProgressesForModuleController)
        .toHigherOrderFunction(getVideoProgressesForModuleController, [DI_SYMBOLS.IGetVideoProgressesForModuleUseCase]);

    videosModule
        .bind(DI_SYMBOLS.IGetVideoProgressesForSectionUseCase)
        .toHigherOrderFunction(getVideoProgressesForSectionUseCase, [DI_SYMBOLS.IVideoProgressesRepository]);

    videosModule
        .bind(DI_SYMBOLS.IGetVideoProgressesForSectionController)
        .toHigherOrderFunction(getVideoProgressesForSectionController, [DI_SYMBOLS.IGetVideoProgressesForSectionUseCase]);

    return videosModule;
}