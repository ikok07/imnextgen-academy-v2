import {
    IGetNotificationChannelByIdUseCase
} from "@/src/application/use-cases/google-notification-channels/get-notification-channel-by-id.use-case";
import {InputParseError} from "@/src/entities/errors/common";
import {
    GetNotificationChannelByIdOptions, getNotificationChannelByIdOptionsSchema
} from "@/src/application/repositories/google-notification-channels/google-notification-channels.repository.interface";

export type IGetNotificationChannelByIdController = ReturnType<typeof getNotificationChannelByIdController>;

export const getNotificationChannelByIdController = (
    getNotificationChannelByIdUseCase: IGetNotificationChannelByIdUseCase
) => async (opts: Partial<GetNotificationChannelByIdOptions>) => {

    const {data: parsedOpts, error} = getNotificationChannelByIdOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    return getNotificationChannelByIdUseCase(parsedOpts);
}