import {DeleteFileOptions, IS3StorageService} from "@/src/application/services/storage/s3-storage.service.interface";

export type IDeleteFileUseCase = ReturnType<typeof deleteFileUseCase>;

export const deleteFileUseCase = (
    s3StorageService: IS3StorageService
) => async (opts: DeleteFileOptions) => {
    return s3StorageService.deleteFile(opts);
}