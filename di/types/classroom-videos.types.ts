import { IVideosRepository } from "@/src/application/repositories/media/videos/videos.repository.interface";
import { IGetVideoByIdUseCase } from "@/src/application/use-cases/media/videos/get-video-by-id.use-case";
import { IGetVideosForModuleUseCase } from "@/src/application/use-cases/media/videos/get-videos-for-module.use-case";
import { IGetVideosForSectionUseCase } from "@/src/application/use-cases/media/videos/get-videos-for-section.use-case";
import { IGetVideosForModuleController } from "@/src/interface-adapters/controllers/media/videos/get-videos-for-module.controller";
import { IGetVideosForSectionController } from "@/src/interface-adapters/controllers/media/videos/get-videos-for-section.controller";
import {IGetVideoByIdController} from "@/src/interface-adapters/controllers/media/videos/get-video-by-id.controller";
import {IGetSignedTokensController} from "@/src/interface-adapters/controllers/media/videos/videos-service/get-signed-tokens.controller";
import {IGetSignedTokensUseCase,} from "@/src/application/use-cases/media/videos/videos-service/get-signed-tokens.use-case";
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
import {
    IGetVideoProgressByVideoIdUseCase
} from "@/src/application/use-cases/media/videos/video-progresses/get-video-progress-by-video-id.use-case";
import {
    IGetVideoProgressByVideoIdController
} from "@/src/interface-adapters/controllers/media/videos/video-progresses/get-video-progress-by-video-id.controller";
import {ICreateVideoUseCase } from "@/src/application/use-cases/media/videos/create-video.use-case";
import { IUpdateVideoUseCase } from "@/src/application/use-cases/media/videos/update-video-use-case";
import { IUpdateVideoController } from "@/src/interface-adapters/controllers/media/videos/update-video.controller";
import { IDeleteVideoUseCase } from "@/src/application/use-cases/media/videos/delete-video.use-case";
import { IDeleteVideoController } from "@/src/interface-adapters/controllers/media/videos/delete-video.controller";
import { IDeleteMultipleVideosUseCase } from "@/src/application/use-cases/media/videos/delete-multiple-videos.use-case";
import { IDeleteMultipleVideosController } from "@/src/interface-adapters/controllers/media/videos/delete-multiple-videos.controller";
import { ICreateVideoController } from "@/src/interface-adapters/controllers/media/videos/create-video.controller";
import { IGetUploadLinkUseCase } from "@/src/application/use-cases/media/videos/videos-service/get-upload-link.use-case";
import {
    IGetUploadLinkController
} from "@/src/interface-adapters/controllers/media/videos/videos-service/get-upload-link.controller";

import { IDeleteVideoUseCase as IDeleteVideoServiceVideoUseCase } from "@/src/application/use-cases/media/videos/videos-service/delete-video.use-case";
import { IDeleteVideoController as IDeleteVideoServiceVideoController } from "@/src/interface-adapters/controllers/media/videos/videos-service/delete-video.controller";
import { IUpdateAssetMetadataUseCase } from "@/src/application/use-cases/media/videos/videos-service/update-asset-metadata.use-case";
import { IUpdateAssetMetadataController } from "@/src/interface-adapters/controllers/media/videos/videos-service/update-asset-metadata.controller";
import { IGetUploadDataUseCase } from "@/src/application/use-cases/media/videos/videos-service/get-upload-data.use-case";
import {
    IGetUploadDataController
} from "@/src/interface-adapters/controllers/media/videos/videos-service/get-upload-data.controller";
import {IGetAssetByIdUseCase} from "@/src/application/use-cases/media/videos/videos-service/get-asset-by-id.use-case";
import {
    IGetAssetByIdController
} from "@/src/interface-adapters/controllers/media/videos/videos-service/get-asset-by-id.controller";

export const CLASSROOM_VIDEOS_SYMBOLS = {
    IVideosService: Symbol.for("IVideosService"),
    IVideosRepository: Symbol.for("IVideosRepository"),

    IGetVideosForModuleUseCase: Symbol.for("IGetVideosForModuleUseCase"),
    IGetVideosForModuleController: Symbol.for("IGetVideosForModuleController"),

    IGetVideosForSectionUseCase: Symbol.for("IGetVideosForSectionUseCase"),
    IGetVideosForSectionController: Symbol.for("IGetVideosForSectionController"),

    IGetVideoByIdUseCase: Symbol.for("IGetVideoByIdUseCase"),
    IGetVideoByIdController: Symbol.for("IGetVideoByIdController"),

    ICreateVideoUseCase: Symbol.for("ICreateVideoUseCase"),
    ICreateVideoController: Symbol.for("ICreateVideoController"),

    IUpdateVideoUseCase: Symbol.for("IUpdateVideoUseCase"),
    IUpdateVideoController: Symbol.for("IUpdateVideoController"),

    IDeleteVideoUseCase: Symbol.for("IDeleteVideoUseCase"),
    IDeleteVideoController: Symbol.for("IDeleteVideoController"),

    IDeleteMultipleVideosUseCase: Symbol.for("IDeleteMultipleVideosUseCase"),
    IDeleteMultipleVideosController: Symbol.for("IDeleteMultipleVideosController"),

    IGetSignedTokensUseCase: Symbol.for("IGetSignedTokensUseCase"),
    IGetSignedTokensController: Symbol.for("IGetSignedTokensController"),

    IGetUploadDataUseCase: Symbol.for("IGetUploadDataUseCase"),
    IGetUploadDataController: Symbol.for("IGetUploadDataController"),

    IGetAssetByIdUseCase: Symbol.for("IGetAssetByIdUseCase"),
    IGetAssetByIdController: Symbol.for('IGetAssetByIdController'),

    IGetUploadLinkUseCase: Symbol.for("IGetUploadLinkUseCase"),
    IGetUploadLinkController: Symbol.for("IGetUploadLinkController"),

    IUpdateAssetMetadataUseCase: Symbol.for("IUpdateAssetMetadataUseCase"),
    IUpdateAssetMetadataController: Symbol.for("IUpdateAssetMetadataController"),

    IDeleteVideoServiceVideoUseCase: Symbol.for("IDeleteVideoServiceVideoUseCase"),
    IDeleteVideoServiceVideoController: Symbol.for("IDeleteVideoServiceVideoController"),

    IVideoProgressesRepository: Symbol.for("IVideoProgressesRepository"),

    IGetVideoProgressByVideoIdUseCase: Symbol.for("IGetVideoProgressByVideoIdUseCase"),
    IGetVideoProgressByVideoIdController: Symbol.for("IGetVideoProgressByVideoIdController"),

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

    ICreateVideoUseCase: ICreateVideoUseCase,
    ICreateVideoController: ICreateVideoController,

    IUpdateVideoUseCase: IUpdateVideoUseCase,
    IUpdateVideoController: IUpdateVideoController,

    IDeleteVideoUseCase: IDeleteVideoUseCase,
    IDeleteVideoController: IDeleteVideoController,

    IDeleteMultipleVideosUseCase: IDeleteMultipleVideosUseCase,
    IDeleteMultipleVideosController: IDeleteMultipleVideosController,

    IGetSignedTokensUseCase: IGetSignedTokensUseCase,
    IGetSignedTokensController: IGetSignedTokensController,

    IGetUploadLinkUseCase: IGetUploadLinkUseCase,
    IGetUploadLinkController: IGetUploadLinkController,

    IGetUploadDataUseCase: IGetUploadDataUseCase,
    IGetUploadDataController: IGetUploadDataController,

    IGetAssetByIdUseCase: IGetAssetByIdUseCase,
    IGetAssetByIdController: IGetAssetByIdController,

    IUpdateAssetMetadataUseCase: IUpdateAssetMetadataUseCase,
    IUpdateAssetMetadataController: IUpdateAssetMetadataController,

    IDeleteVideoServiceVideoUseCase: IDeleteVideoServiceVideoUseCase,
    IDeleteVideoServiceVideoController: IDeleteVideoServiceVideoController,

    IVideoProgressesRepository: IVideoProgressesRepository,

    IGetVideoProgressByVideoIdUseCase: IGetVideoProgressByVideoIdUseCase,
    IGetVideoProgressByVideoIdController: IGetVideoProgressByVideoIdController

    IGetVideoProgressesForModuleUseCase: IGetVideoProgressesForModuleUseCase,
    IGetVideoProgressesForModuleController: IGetVideoProgressesForModuleController,

    IGetVideoProgressesForSectionUseCase: IGetVideoProgressesForSectionUseCase,
    IGetVideoProgressesForSectionController: IGetVideoProgressesForSectionController,

    ISetVideoProgressUseCase: ISetVideoProgressUseCase,
    ISetVideoProgressController: ISetVideoProgressController
}