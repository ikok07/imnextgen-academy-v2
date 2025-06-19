import {
    DeleteMultipleFilesOptions,
    IS3StorageService
} from "@/src/application/services/storage/s3-storage.service.interface";

export type IDeleteMultipleFilesUseCase = ReturnType<typeof deleteMultipleFilesUseCase>;

export const deleteMultipleFilesUseCase = (
    s3StorageService: IS3StorageService
) => async (opts: DeleteMultipleFilesOptions) => {
    return s3StorageService.deleteMultipleFiles(opts);
}