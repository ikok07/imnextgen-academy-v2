import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {VideoResourcesRepository} from "@/src/infrastructure/repositories/media/videos/video-resources.repository";
import {createResourceUseCase} from "@/src/application/use-cases/media/videos/video-resources/create-resource.use-case";
import { createResourceController } from "@/src/interface-adapters/controllers/media/videos/video-resources/create-resource.controller";
import { deleteResourceUseCase } from "@/src/application/use-cases/media/videos/video-resources/delete-resource.use-case";
import {
    deleteResourceController
} from "@/src/interface-adapters/controllers/media/videos/video-resources/delete-resource.controller";
import {
    deleteMultipleResourcesUseCase
} from "@/src/application/use-cases/media/videos/video-resources/delete-multiple-resource.use-case";
import {
    deleteMultipleResourcesController
} from "@/src/interface-adapters/controllers/media/videos/video-resources/delete-multiple-resources.controller";

export function createVideoResourcesModule() {
    const videoResourcesModule = createModule();

    videoResourcesModule
        .bind(DI_SYMBOLS.IVideoResourcesRepository)
        .toClass(VideoResourcesRepository);

    videoResourcesModule
        .bind(DI_SYMBOLS.ICreateResourceUseCase)
        .toHigherOrderFunction(createResourceUseCase, [DI_SYMBOLS.IVideoResourcesRepository]);

    videoResourcesModule
        .bind(DI_SYMBOLS.ICreateResourceController)
        .toHigherOrderFunction(createResourceController, [DI_SYMBOLS.ICreateResourceUseCase]);

    videoResourcesModule
        .bind(DI_SYMBOLS.IDeleteResourceUseCase)
        .toHigherOrderFunction(deleteResourceUseCase, [DI_SYMBOLS.IVideoResourcesRepository]);

    videoResourcesModule
        .bind(DI_SYMBOLS.IDeleteResourceController)
        .toHigherOrderFunction(deleteResourceController, [DI_SYMBOLS.IDeleteResourceUseCase]);

    videoResourcesModule
        .bind(DI_SYMBOLS.IDeleteMultipleResourcesUseCase)
        .toHigherOrderFunction(deleteMultipleResourcesUseCase, [DI_SYMBOLS.IVideoResourcesRepository]);

    videoResourcesModule
        .bind(DI_SYMBOLS.IDeleteMultipleResourcesController)
        .toHigherOrderFunction(deleteMultipleResourcesController, [DI_SYMBOLS.IDeleteMultipleResourcesUseCase]);

    return videoResourcesModule;
}