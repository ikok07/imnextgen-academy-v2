import {IDeleteMultipleFilesUseCase} from "@/src/application/use-cases/storage/delete-multiple-files.use-case";
import {
    DeleteMultipleFilesOptions,
    deleteMultipleFilesOptionsSchema
} from "@/src/application/services/storage/s3-storage.service.interface";
import {InputParseError} from "@/src/entities/errors/common";

export type IDeleteMultipleFilesController = ReturnType<typeof deleteMultipleFilesController>;

export const deleteMultipleFilesController = (
    deleteMultipleFilesUseCase: IDeleteMultipleFilesUseCase
) => async (opts: Partial<DeleteMultipleFilesOptions>) => {

    const {data: parsedOpts, error} = deleteMultipleFilesOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    return deleteMultipleFilesUseCase(parsedOpts);
}