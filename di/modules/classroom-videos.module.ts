import {createModule} from "@evyweb/ioctopus";
import {VideosRepository} from "@/src/infrastructure/repositories/media/videos/videos.repository";
import {DI_SYMBOLS} from "@/di/types/types";
import {getVideosForModuleUseCase} from "@/src/application/use-cases/media/videos/get-videos-for-module.use-case";
import {
    getVideosForModuleController
} from "@/src/interface-adapters/controllers/media/videos/get-videos-for-module.controller";

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

    return videosModule;
}