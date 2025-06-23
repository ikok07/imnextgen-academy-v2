import {IGetUploadLinkUseCase} from "@/src/application/use-cases/media/videos/videos-service/get-upload-link.use-case";
import {
    GetUploadLinkOptions,
    getUploadLinkOptionsSchema
} from "@/src/application/services/media/videos/videos.service.interface";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetUploadLinkController = ReturnType<typeof getUploadLinkController>;

export const getUploadLinkController = (
    getUploadLinkUseCase: IGetUploadLinkUseCase
) => async (opts: Partial<GetUploadLinkOptions>) => {

    const {data: parsedOpts, error} = getUploadLinkOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    return getUploadLinkUseCase(parsedOpts);
}