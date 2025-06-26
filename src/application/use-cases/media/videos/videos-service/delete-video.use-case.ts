import {IVideosService} from "@/src/application/services/media/videos/videos.service.interface";

export type IDeleteVideoUseCase = ReturnType<typeof deleteVideoUseCase>;

export const deleteVideoUseCase = (
    videosService: IVideosService
) => async (assetId: string) => {
    return videosService.deleteVideo(assetId);
}