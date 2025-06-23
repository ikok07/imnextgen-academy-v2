import {IVideosService} from "@/src/application/services/media/videos/videos.service.interface";

export type IGetUploadDataUseCase = ReturnType<typeof getUploadDataUseCase>;

export const getUploadDataUseCase = (
    videosService: IVideosService
) => async (uploadId: string) => {
    return videosService.getUploadData(uploadId);
}