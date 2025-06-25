import {
    IGetAssetByPlaybackIdUseCase
} from "@/src/application/use-cases/media/videos/videos-service/get-asset-by-playback-id.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetAssetByPlaybackIdController = ReturnType<typeof getAssetByPlaybackIdController>;

export const getAssetByPlaybackIdController = (
    getAssetByPlaybackIdUseCase: IGetAssetByPlaybackIdUseCase
) => async (playbackId: string | undefined) => {

    if (!playbackId) throw new InputParseError("Invalid playbackId!");

    return getAssetByPlaybackIdUseCase(playbackId);
}