import { IDeleteResourceController } from "@/src/interface-adapters/controllers/media/videos/video-resources/delete-resource.controller"
import {
    IDeleteResourceUseCase
} from "@/src/application/use-cases/media/videos/video-resources/delete-resource.use-case";
import {
    ICreateResourceUseCase
} from "@/src/application/use-cases/media/videos/video-resources/create-resource.use-case";
import {
    ICreateResourceController
} from "@/src/interface-adapters/controllers/media/videos/video-resources/create-resource.controller";
import {
    IVideoResourcesRepository
} from "@/src/application/repositories/media/videos/video-resources.repository.interface";
import {
    IDeleteMultipleResourcesUseCase
} from "@/src/application/use-cases/media/videos/video-resources/delete-multiple-resource.use-case";
import {
    IDeleteMultipleResourcesController
} from "@/src/interface-adapters/controllers/media/videos/video-resources/delete-multiple-resources.controller";

export const VIDEO_RESOURCES_SYMBOLS = {
    IVideoResourcesRepository: Symbol.for("IVideoResourcesRepository"),

    ICreateResourceUseCase: Symbol.for("ICreateResourceUseCase"),
    ICreateResourceController: Symbol.for("ICreateResourceController"),

    IDeleteResourceUseCase: Symbol.for("IDeleteResourceUseCase"),
    IDeleteResourceController: Symbol.for("IDeleteResourceController"),

    IDeleteMultipleResourcesUseCase: Symbol.for("IDeleteMultipleResourcesUseCase"),
    IDeleteMultipleResourcesController: Symbol.for("IDeleteMultipleResourcesController")
}

export interface VIDEO_RESOURCES_RETURN_TYPES {
    IVideoResourcesRepository: IVideoResourcesRepository,

    ICreateResourceUseCase: ICreateResourceUseCase,
    ICreateResourceController: ICreateResourceController

    IDeleteResourceUseCase: IDeleteResourceUseCase,
    IDeleteResourceController: IDeleteResourceController,

    IDeleteMultipleResourcesUseCase: IDeleteMultipleResourcesUseCase,
    IDeleteMultipleResourcesController: IDeleteMultipleResourcesController
}


