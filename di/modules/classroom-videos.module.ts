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
import {MuxService} from "@/src/infrastructure/services/media/videos/mux.service";
import {
    getSignedTokensController
} from "@/src/interface-adapters/controllers/media/videos/videos-service/get-signed-tokens.controller";
import {getSignedTokensUrlUseCase} from "@/src/application/use-cases/media/videos/videos-service/get-signed-tokens.use-case";
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
import {
    setVideoProgressUseCase
} from "@/src/application/use-cases/media/videos/video-progresses/set-video-progress.use-case";
import {
    setVideoProgressController
} from "@/src/interface-adapters/controllers/media/videos/video-progresses/set-video-progress.controller";
import {
    getVideoProgressByVideoIdUseCase
} from "@/src/application/use-cases/media/videos/video-progresses/get-video-progress-by-video-id.use-case";
import {
    getVideoProgressByVideoIdController
} from "@/src/interface-adapters/controllers/media/videos/video-progresses/get-video-progress-by-video-id.controller";
import {createVideoUseCase} from "@/src/application/use-cases/media/videos/create-video.use-case";
import {createVideoController} from "@/src/interface-adapters/controllers/media/videos/create-video.controller";
import {updateVideoUseCase} from "@/src/application/use-cases/media/videos/update-video-use-case";
import {updateVideoController} from "@/src/interface-adapters/controllers/media/videos/update-video.controller";
import {deleteVideoUseCase} from "@/src/application/use-cases/media/videos/delete-video.use-case";
import {deleteVideoController} from "@/src/interface-adapters/controllers/media/videos/delete-video.controller";
import {deleteMultipleVideosUseCase} from "@/src/application/use-cases/media/videos/delete-multiple-videos.use-case";
import {
    deleteMultipleVideosController
} from "@/src/interface-adapters/controllers/media/videos/delete-multiple-videos.controller";
import {getUploadLinkUseCase} from "@/src/application/use-cases/media/videos/videos-service/get-upload-link.use-case";
import {
    getUploadLinkController
} from "@/src/interface-adapters/controllers/media/videos/videos-service/get-upload-link.controller";
import {deleteVideoUseCase as deleteVideoServiceVideoUseCase} from "@/src/application/use-cases/media/videos/videos-service/delete-video.use-case";
import {deleteVideoController as deleteVideoServiceVideoController} from "@/src/interface-adapters/controllers/media/videos/videos-service/delete-video.controller";
import {
    updateAssetMetadataUseCase
} from "@/src/application/use-cases/media/videos/videos-service/update-asset-metadata.use-case";
import {
    updateAssetMetadataController
} from "@/src/interface-adapters/controllers/media/videos/videos-service/update-asset-metadata.controller";
import {getUploadDataUseCase} from "@/src/application/use-cases/media/videos/videos-service/get-upload-data.use-case";
import {
    getUploadDataController
} from "@/src/interface-adapters/controllers/media/videos/videos-service/get-upload-data.controller";
import {getAssetByIdUseCase} from "@/src/application/use-cases/media/videos/videos-service/get-asset-by-id.use-case";
import {
    getAssetByIdController
} from "@/src/interface-adapters/controllers/media/videos/videos-service/get-asset-by-id.controller";
import {
    getAssetByPlaybackIdUseCase
} from "@/src/application/use-cases/media/videos/videos-service/get-assets-by-playback-id.use-case";
import {
    getAssetByPlaybackIdController
} from "@/src/interface-adapters/controllers/media/videos/videos-service/get-assets-by-playback-id.controller";

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
        .bind(DI_SYMBOLS.ICreateVideoUseCase)
        .toHigherOrderFunction(createVideoUseCase, [DI_SYMBOLS.IVideosRepository]);

    videosModule
        .bind(DI_SYMBOLS.ICreateVideoController)
        .toHigherOrderFunction(createVideoController, [DI_SYMBOLS.ICreateVideoUseCase]);

    videosModule
        .bind(DI_SYMBOLS.IUpdateVideoUseCase)
        .toHigherOrderFunction(updateVideoUseCase, [DI_SYMBOLS.IVideosRepository]);

    videosModule
        .bind(DI_SYMBOLS.IUpdateVideoController)
        .toHigherOrderFunction(updateVideoController, [DI_SYMBOLS.ICreateVideoUseCase]);

    videosModule
        .bind(DI_SYMBOLS.IDeleteVideoUseCase)
        .toHigherOrderFunction(deleteVideoUseCase, [DI_SYMBOLS.IVideosRepository]);

    videosModule
        .bind(DI_SYMBOLS.IDeleteVideoController)
        .toHigherOrderFunction(deleteVideoController, [DI_SYMBOLS.IDeleteVideoUseCase]);

    videosModule
        .bind(DI_SYMBOLS.IDeleteMultipleVideosUseCase)
        .toHigherOrderFunction(deleteMultipleVideosUseCase, [DI_SYMBOLS.IVideosRepository]);

    videosModule
        .bind(DI_SYMBOLS.IDeleteMultipleVideosController)
        .toHigherOrderFunction(deleteMultipleVideosController, [DI_SYMBOLS.IDeleteMultipleVideosUseCase]);

    videosModule
        .bind(DI_SYMBOLS.IGetSignedTokensUseCase)
        .toHigherOrderFunction(getSignedTokensUrlUseCase, [DI_SYMBOLS.IVideosService]);

    videosModule
        .bind(DI_SYMBOLS.IGetSignedTokensController)
        .toHigherOrderFunction(getSignedTokensController, [DI_SYMBOLS.IGetSignedTokensUseCase]);

    videosModule
        .bind(DI_SYMBOLS.IGetUploadLinkUseCase)
        .toHigherOrderFunction(getUploadLinkUseCase, [DI_SYMBOLS.IVideosService]);

    videosModule
        .bind(DI_SYMBOLS.IGetUploadLinkController)
        .toHigherOrderFunction(getUploadLinkController, [DI_SYMBOLS.IGetUploadLinkUseCase]);

    videosModule
        .bind(DI_SYMBOLS.IGetUploadDataUseCase)
        .toHigherOrderFunction(getUploadDataUseCase, [DI_SYMBOLS.IVideosService]);

    videosModule
        .bind(DI_SYMBOLS.IGetUploadDataController)
        .toHigherOrderFunction(getUploadDataController, [DI_SYMBOLS.IGetUploadDataUseCase]);

    videosModule
        .bind(DI_SYMBOLS.IGetAssetByIdUseCase)
        .toHigherOrderFunction(getAssetByIdUseCase, [DI_SYMBOLS.IVideosService]);

    videosModule
        .bind(DI_SYMBOLS.IGetAssetByIdController)
        .toHigherOrderFunction(getAssetByIdController, [DI_SYMBOLS.IGetAssetByIdUseCase]);

    videosModule
        .bind(DI_SYMBOLS.IGetAssetByPlaybackIdUseCase)
        .toHigherOrderFunction(getAssetByPlaybackIdUseCase, [DI_SYMBOLS.IVideosService]);

    videosModule
        .bind(DI_SYMBOLS.IGetAssetByPlaybackIdController)
        .toHigherOrderFunction(getAssetByPlaybackIdController, [DI_SYMBOLS.IGetAssetByPlaybackIdUseCase]);

    videosModule
        .bind(DI_SYMBOLS.IUpdateAssetMetadataUseCase)
        .toHigherOrderFunction(updateAssetMetadataUseCase, [DI_SYMBOLS.IVideosService]);

    videosModule
        .bind(DI_SYMBOLS.IUpdateAssetMetadataController)
        .toHigherOrderFunction(updateAssetMetadataController, [DI_SYMBOLS.IUpdateAssetMetadataUseCase]);

    videosModule
        .bind(DI_SYMBOLS.IDeleteVideoServiceVideoUseCase)
        .toHigherOrderFunction(deleteVideoServiceVideoUseCase, [DI_SYMBOLS.IVideosService]);

    videosModule
        .bind(DI_SYMBOLS.IDeleteVideoServiceVideoController)
        .toHigherOrderFunction(deleteVideoServiceVideoController, [DI_SYMBOLS.IDeleteVideoServiceVideoUseCase]);

    videosModule
        .bind(DI_SYMBOLS.IVideoProgressesRepository)
        .toClass(VideoProgressesRepository);

    videosModule
        .bind(DI_SYMBOLS.IGetVideoProgressByVideoIdUseCase)
        .toHigherOrderFunction(getVideoProgressByVideoIdUseCase, [DI_SYMBOLS.IVideoProgressesRepository]);

    videosModule
        .bind(DI_SYMBOLS.IGetVideoProgressByVideoIdController)
        .toHigherOrderFunction(getVideoProgressByVideoIdController, [DI_SYMBOLS.IGetVideoProgressByVideoIdUseCase]);

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

    videosModule
        .bind(DI_SYMBOLS.ISetVideoProgressUseCase)
        .toHigherOrderFunction(setVideoProgressUseCase, [DI_SYMBOLS.IVideoProgressesRepository]);

    videosModule
        .bind(DI_SYMBOLS.ISetVideoProgressController)
        .toHigherOrderFunction(setVideoProgressController, [DI_SYMBOLS.ISetVideoProgressUseCase]);

    return videosModule;
}