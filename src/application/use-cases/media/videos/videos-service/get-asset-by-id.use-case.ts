import {IVideosService} from "@/src/application/services/media/videos/videos.service.interface";

export type IGetAssetByIdUseCase = ReturnType<typeof getAssetByIdUseCase>;

export const getAssetByIdUseCase = (
    videosSerivice: IVideosService
) => async (assetId: string) => {
    return videosSerivice.getAssetById(assetId);
}