import {IGetUploadDataUseCase} from "@/src/application/use-cases/media/videos/videos-service/get-upload-data.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetUploadDataController = ReturnType<typeof getUploadDataController>;

export const getUploadDataController = (
    getUploadDataUseCase: IGetUploadDataUseCase
) => async (uploadId: string | undefined) => {

    if (!uploadId) throw new InputParseError("Invalid uploadId!");

    return getUploadDataUseCase(uploadId);
}