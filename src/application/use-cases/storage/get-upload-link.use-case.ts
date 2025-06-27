import {GetUploadLinkOptions, IS3StorageService} from "@/src/application/services/storage/s3-storage.service.interface";

export type IGetUploadLinkUseCase = ReturnType<typeof getUploadLinkUseCase>;

export const getUploadLinkUseCase = (
    s3StorageService: IS3StorageService
) => async (data: GetUploadLinkOptions) => {
    return s3StorageService.getUploadLink(data);
}