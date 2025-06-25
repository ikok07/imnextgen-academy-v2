import {IVideosService} from "@/src/application/services/media/videos/videos.service.interface";

export type IGetAssetByPlaybackIdUseCase = ReturnType<typeof getAssetByPlaybackIdUseCase>;

export const getAssetByPlaybackIdUseCase = (
    videosService: IVideosService
) => async (playbackId: string) => {
    return videosService.getAssetByPlaybackId(playbackId);
}