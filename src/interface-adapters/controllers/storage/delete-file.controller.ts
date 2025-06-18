import {IDeleteFileUseCase} from "@/src/application/use-cases/storage/delete-file.use-case";
import {
    DeleteFileOptions,
    deleteFileOptionsSchema
} from "@/src/application/services/storage/s3-storage.service.interface";
import {InputParseError} from "@/src/entities/errors/common";

export type IDeleteFileController = ReturnType<typeof deleteFileController>;

export const deleteFileController = (
    deleteFileUseCase: IDeleteFileUseCase
) => async (opts: Partial<DeleteFileOptions>) => {

    const {data: parsedOpts, error} = deleteFileOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    return deleteFileUseCase(parsedOpts);
}