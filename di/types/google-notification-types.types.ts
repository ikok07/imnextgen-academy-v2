import { IGoogleNotificationChannelsRepository } from "@/src/application/repositories/google-notification-channels/google-notification-channels.repository.interface";
import { IGetNotificationChannelByIdUseCase } from "@/src/application/use-cases/google-notification-channels/get-notification-channel-by-id.use-case";
import {
    IGetNotificationChannelByIdController
} from "@/src/interface-adapters/controllers/google-notification-channels/get-notification-channel-by-id.controller";
import { ICreateNotificationChannelUseCase } from "@/src/application/use-cases/google-notification-channels/create-notification-channel.use-case";
import {
    ICreateNotificationChannelController
} from "@/src/interface-adapters/controllers/google-notification-channels/create-notification-channel.controller";
import {
    IDeleteNotificationChannelUseCase
} from "@/src/application/use-cases/google-notification-channels/delete-notification-channel.use-case";
import {
    IDeleteNotificationChannelController
} from "@/src/interface-adapters/controllers/google-notification-channels/delete-notification-channel.controller";

export const GOOGLE_NOTIFICATION_CHANNELS_SYMBOLS = {
    IGoogleNotificationChannelsRepository: Symbol.for("IGoogleNotificationChannelsRepository"),

    IGetNotificationChannelByIdUseCase: Symbol.for("IGetNotificationChannelByIdUseCase"),
    IGetNotificationChannelByIdController: Symbol.for("IGetNotificationChannelByIdController"),

    ICreateNotificationChannelUseCase: Symbol.for("ICreateNotificationChannelUseCase"),
    ICreateNotificationChannelController: Symbol.for("ICreateNotificationChannelController"),

    IDeleteNotificationChannelUseCase: Symbol.for("IDeleteNotificationChannelUseCase"),
    IDeleteNotificationChannelController: Symbol.for("IDeleteNotificationChannelController")
}

export interface GOOGLE_NOTIFICATION_CHANNELS_RETURN_TYPES {
    IGoogleNotificationChannelsRepository: IGoogleNotificationChannelsRepository,

    IGetNotificationChannelByIdUseCase: IGetNotificationChannelByIdUseCase,
    IGetNotificationChannelByIdController: IGetNotificationChannelByIdController,

    ICreateNotificationChannelUseCase: ICreateNotificationChannelUseCase,
    ICreateNotificationChannelController: ICreateNotificationChannelController,

    IDeleteNotificationChannelUseCase: IDeleteNotificationChannelUseCase,
    IDeleteNotificationChannelController: IDeleteNotificationChannelController
}


