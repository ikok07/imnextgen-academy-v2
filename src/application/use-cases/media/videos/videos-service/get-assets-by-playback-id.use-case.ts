import {IVideosService} from "@/src/application/services/media/videos/videos.service.interface";

export type IGetAssetsByPlaybackIdUseCase = ReturnType<typeof getAssetsByPlaybackIdUseCase>;

export const getAssetsByPlaybackIdUseCase = (
    videosService: IVideosService
) => async (playbackIds: string[]) => {
    return videosService.getAssetsByPlaybackId(playbackIds);
}