import {
    IGetAssetsByPlaybackIdUseCase
} from "@/src/application/use-cases/media/videos/videos-service/get-assets-by-playback-id.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetAssetsByPlaybackIdController = ReturnType<typeof getAssetsByPlaybackIdController>;

export const getAssetsByPlaybackIdController = (
    getAssetsByPlaybackIdUseCase: IGetAssetsByPlaybackIdUseCase
) => async (playbackIds: string[]) => {

    if (playbackIds.length === 0) throw new InputParseError("Invalid playbackIds!");

    return getAssetsByPlaybackIdUseCase(playbackIds);
}