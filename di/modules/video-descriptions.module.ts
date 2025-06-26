import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {
    createVideoDescriptionUseCase
} from "@/src/application/use-cases/media/videos/video-descriptions/create-video-description.use-case";
import {
    VideoDescriptionsRepository
} from "@/src/infrastructure/repositories/media/videos/video-descriptions.repository";
import {
    createVideoDescriptionController
} from "@/src/interface-adapters/controllers/media/videos/video-descriptions/create-video-description.controller";
import {
    deleteVideoDescriptionUseCase
} from "@/src/application/use-cases/media/videos/video-descriptions/delete-video-description.use-case";
import {
    deleteVideoDescriptionController
} from "@/src/interface-adapters/controllers/media/videos/video-descriptions/delete-video-description.controller";
import {
    updateVideoDescriptionUseCase
} from "@/src/application/use-cases/media/videos/video-descriptions/update-video-description.use-case";
import {
    updateVideoDescriptionController
} from "@/src/interface-adapters/controllers/media/videos/video-descriptions/update-video-description.controller";
import {
    getVideoDescriptionsUseCase
} from "@/src/application/use-cases/media/videos/video-descriptions/get-video-descriptions.use-case";
import {
    getVideoDescriptionsController
} from "@/src/interface-adapters/controllers/media/videos/video-descriptions/get-video-descriptions.controller";
import {
    getVideoDescriptionByIdUseCase
} from "@/src/application/use-cases/media/videos/video-descriptions/get-video-description-by-id.use-case";
import {
    getVideoDescriptionByIdController
} from "@/src/interface-adapters/controllers/media/videos/video-descriptions/get-video-description-by-id.controller";

export function createVideoDescriptionsModule() {
    const videoDescriptionsModule = createModule();

    videoDescriptionsModule
        .bind(DI_SYMBOLS.IVideoDescriptionsRepository)
        .toClass(VideoDescriptionsRepository);

    videoDescriptionsModule
        .bind(DI_SYMBOLS.IGetVideoDescriptionsUseCase)
        .toHigherOrderFunction(getVideoDescriptionsUseCase, [DI_SYMBOLS.IVideoDescriptionsRepository]);

    videoDescriptionsModule
        .bind(DI_SYMBOLS.IGetVideoDescriptionsController)
        .toHigherOrderFunction(getVideoDescriptionsController, [DI_SYMBOLS.IGetVideoDescriptionsUseCase]);

    videoDescriptionsModule
        .bind(DI_SYMBOLS.IGetVideoDescriptionByIdUseCase)
        .toHigherOrderFunction(getVideoDescriptionByIdUseCase, [DI_SYMBOLS.IVideoDescriptionsRepository]);

    videoDescriptionsModule
        .bind(DI_SYMBOLS.IGetVideoDescriptionByIdController)
        .toHigherOrderFunction(getVideoDescriptionByIdController, [DI_SYMBOLS.IGetVideoDescriptionByIdUseCase]);

    videoDescriptionsModule
        .bind(DI_SYMBOLS.ICreateVideoDescriptionUseCase)
        .toHigherOrderFunction(createVideoDescriptionUseCase, [DI_SYMBOLS.IVideoDescriptionsRepository]);

    videoDescriptionsModule
        .bind(DI_SYMBOLS.ICreateVideoDescriptionController)
        .toHigherOrderFunction(createVideoDescriptionController, [DI_SYMBOLS.ICreateVideoDescriptionUseCase]);

    videoDescriptionsModule
        .bind(DI_SYMBOLS.IUpdateVideoDescriptionUseCase)
        .toHigherOrderFunction(updateVideoDescriptionUseCase, [DI_SYMBOLS.IVideoDescriptionsRepository]);

    videoDescriptionsModule
        .bind(DI_SYMBOLS.IUpdateVideoDescriptionController)
        .toHigherOrderFunction(updateVideoDescriptionController, [DI_SYMBOLS.IUpdateVideoDescriptionUseCase]);

    videoDescriptionsModule
        .bind(DI_SYMBOLS.IDeleteVideoDescriptionUseCase)
        .toHigherOrderFunction(deleteVideoDescriptionUseCase, [DI_SYMBOLS.IVideoDescriptionsRepository]);

    videoDescriptionsModule
        .bind(DI_SYMBOLS.IDeleteVideoDescriptionController)
        .toHigherOrderFunction(deleteVideoDescriptionController, [DI_SYMBOLS.IDeleteVideoDescriptionUseCase]);

    return videoDescriptionsModule;
}