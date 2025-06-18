import {IUploadSmallFileUseCase} from "@/src/application/use-cases/storage/upload-small-file.use-case";
import {
    UploadFileOptions,
    uploadFileOptionsSchema
} from "@/src/application/services/storage/s3-storage.service.interface";
import {InputParseError} from "@/src/entities/errors/common";

export type IUploadSmallFileController = ReturnType<typeof uploadSmallFileController>;

export const uploadSmallFileController = (
    uploadSmallFileUseCase: IUploadSmallFileUseCase
) => async (opts: Partial<UploadFileOptions>) => {

    const {data: parsedOpts, error} = uploadFileOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    return uploadSmallFileUseCase(parsedOpts)
}