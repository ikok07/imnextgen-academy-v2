import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {
    GoogleNotificationChannelsRepository
} from "@/src/infrastructure/repositories/google-notification-channels/google-notification-channels.repository";
import {
    getNotificationChannelByIdUseCase
} from "@/src/application/use-cases/google-notification-channels/get-notification-channel-by-id.use-case";
import {
    getNotificationChannelByIdController
} from "@/src/interface-adapters/controllers/google-notification-channels/get-notification-channel-by-id.controller";
import {
    createNotificationChannelUseCase
} from "@/src/application/use-cases/google-notification-channels/create-notification-channel.use-case";
import {
    createNotificationChannelController
} from "@/src/interface-adapters/controllers/google-notification-channels/create-notification-channel.controller";
import {
    deleteNotificationChannelUseCase
} from "@/src/application/use-cases/google-notification-channels/delete-notification-channel.use-case";
import {
    deleteNotificationChannelController
} from "@/src/interface-adapters/controllers/google-notification-channels/delete-notification-channel.controller";

export function createGoogleNotificationChannelsModule() {
    const googleNotificationChannelsModule = createModule();

    googleNotificationChannelsModule
        .bind(DI_SYMBOLS.IGoogleNotificationChannelsRepository)
        .toClass(GoogleNotificationChannelsRepository);

    googleNotificationChannelsModule
        .bind(DI_SYMBOLS.IGetNotificationChannelByIdUseCase)
        .toHigherOrderFunction(getNotificationChannelByIdUseCase, [DI_SYMBOLS.IGoogleNotificationChannelsRepository]);

    googleNotificationChannelsModule
        .bind(DI_SYMBOLS.IGetNotificationChannelByIdController)
        .toHigherOrderFunction(getNotificationChannelByIdController, [DI_SYMBOLS.IGetNotificationChannelByIdUseCase]);

    googleNotificationChannelsModule
        .bind(DI_SYMBOLS.ICreateNotificationChannelUseCase)
        .toHigherOrderFunction(createNotificationChannelUseCase, [DI_SYMBOLS.IGoogleNotificationChannelsRepository]);

    googleNotificationChannelsModule
        .bind(DI_SYMBOLS.ICreateNotificationChannelController)
        .toHigherOrderFunction(createNotificationChannelController, [DI_SYMBOLS.ICreateNotificationChannelUseCase]);

    googleNotificationChannelsModule
        .bind(DI_SYMBOLS.IDeleteNotificationChannelUseCase)
        .toHigherOrderFunction(deleteNotificationChannelUseCase, [DI_SYMBOLS.IGoogleNotificationChannelsRepository]);

    googleNotificationChannelsModule
        .bind(DI_SYMBOLS.IDeleteNotificationChannelController)
        .toHigherOrderFunction(deleteNotificationChannelController, [DI_SYMBOLS.IDeleteNotificationChannelUseCase]);

    return googleNotificationChannelsModule;
}