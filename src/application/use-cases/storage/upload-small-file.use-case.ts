import {IS3StorageService, UploadFileOptions} from "@/src/application/services/storage/s3-storage.service.interface";

export type IUploadSmallFileUseCase = ReturnType<typeof uploadSmallFileUseCase>;

export const uploadSmallFileUseCase = (
    s3StorageService: IS3StorageService
) => async (opts: UploadFileOptions) => {
    return s3StorageService.uploadSmallFile(opts);
}