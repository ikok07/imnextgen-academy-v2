import {AssetMetadata, IVideosService} from "@/src/application/services/media/videos/videos.service.interface";

export type IUpdateAssetMetadataUseCase = ReturnType<typeof updateAssetMetadataUseCase>;

export const updateAssetMetadataUseCase = (
    videosService: IVideosService
) => async (assetId: string, opts: AssetMetadata) => {
    return videosService.updateAssetMetadata(assetId, opts);
}