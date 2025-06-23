import {
    IVideoDescriptionsRepository
} from "@/src/application/repositories/media/videos/video-descriptions.repository.interface";
import { ICreateVideoDescriptionUseCase } from "@/src/application/use-cases/media/videos/video-descriptions/create-video-description.use-case";
import { IDeleteVideoDescriptionUseCase } from "@/src/application/use-cases/media/videos/video-descriptions/delete-video-description.use-case";
import { IGetVideoDescriptionByIdUseCase } from "@/src/application/use-cases/media/videos/video-descriptions/get-video-description-by-id.use-case";
import { IGetVideoDescriptionsUseCase } from "@/src/application/use-cases/media/videos/video-descriptions/get-video-descriptions.use-case";
import { IUpdateVideoDescriptionUseCase } from "@/src/application/use-cases/media/videos/video-descriptions/update-video-description.use-case";
import { ICreateVideoDescriptionController } from "@/src/interface-adapters/controllers/media/videos/video-descriptions/create-video-description.controller";
import { IGetVideoDescriptionByIdController } from "@/src/interface-adapters/controllers/media/videos/video-descriptions/get-video-description-by-id.controller";
import { IGetVideoDescriptionsController } from "@/src/interface-adapters/controllers/media/videos/video-descriptions/get-video-descriptions.controller";
import { IUpdateVideoDescriptionController } from "@/src/interface-adapters/controllers/media/videos/video-descriptions/update-video-description.controller";
import {
    IDeleteVideoDescriptionController
} from "@/src/interface-adapters/controllers/media/videos/video-descriptions/delete-video-description.controller";

export const VIDEO_DESCRIPTIONS_SYMBOLS = {
    IVideoDescriptionsRepository: Symbol.for("IVideoDescriptionsRepository"),

    IGetVideoDescriptionsUseCase: Symbol.for("IGetVideoDescriptionsUseCase"),
    IGetVideoDescriptionsController: Symbol.for("IGetVideoDescriptionsController"),

    IGetVideoDescriptionByIdUseCase: Symbol.for("IGetVideoDescriptionByIdUseCase"),
    IGetVideoDescriptionByIdController: Symbol.for("IGetVideoDescriptionByIdController"),

    ICreateVideoDescriptionUseCase: Symbol.for("ICreateVideoDescriptionByIdUseCase"),
    ICreateVideoDescriptionController: Symbol.for("ICreateVideoDescriptionController"),

    IUpdateVideoDescriptionUseCase: Symbol.for("IUpdateVideoDescriptionUseCase"),
    IUpdateVideoDescriptionController: Symbol.for("IUpdateVideoDescriptionController"),

    IDeleteVideoDescriptionUseCase: Symbol.for("IDeleteVideoDescriptionUseCase"),
    IDeleteVideoDescriptionController: Symbol.for("IDeleteVideoDescriptionController")
}

export interface VIDEO_DESCRIPTIONS_RETURN_TYPES {
    IVideoDescriptionsRepository: IVideoDescriptionsRepository,

    IGetVideoDescriptionsUseCase: IGetVideoDescriptionsUseCase,
    IGetVideoDescriptionsController: IGetVideoDescriptionsController,

    IGetVideoDescriptionByIdUseCase: IGetVideoDescriptionByIdUseCase,
    IGetVideoDescriptionByIdController: IGetVideoDescriptionByIdController,

    ICreateVideoDescriptionUseCase: ICreateVideoDescriptionUseCase,
    ICreateVideoDescriptionController: ICreateVideoDescriptionController,

    IUpdateVideoDescriptionUseCase: IUpdateVideoDescriptionUseCase,
    IUpdateVideoDescriptionController: IUpdateVideoDescriptionController,

    IDeleteVideoDescriptionUseCase: IDeleteVideoDescriptionUseCase,
    IDeleteVideoDescriptionController: IDeleteVideoDescriptionController
}


