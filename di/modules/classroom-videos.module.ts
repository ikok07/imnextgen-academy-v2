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

export function createVideosModule() {
    const videosModule = createModule();

    videosModule
        .bind(DI_SYMBOLS.IVideosRepository)
        .toClass(VideosRepository);

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

    return videosModule;
}