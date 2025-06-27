import {IGetUploadLinkUseCase} from "@/src/application/use-cases/storage/get-upload-link.use-case";
import {
    GetUploadLinkOptions,
    getUploadLinkOptionsSchema
} from "@/src/application/services/storage/s3-storage.service.interface";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetUploadLinkController = ReturnType<typeof getUploadLinkController>;

export const getUploadLinkController = (
    getUploadLinkUseCase: IGetUploadLinkUseCase
) => async (data: Partial<GetUploadLinkOptions>) => {

    const {data: parsedData, error} = getUploadLinkOptionsSchema.safeParse(data);
    if (error) throw new InputParseError(`Invalid data! ${error}`);

    return getUploadLinkUseCase(parsedData);
}