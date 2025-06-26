import {IVideosService} from "@/src/application/services/media/videos/videos.service.interface";
import {TypeClaim} from "@mux/mux-node/util/jwt-types";

export type IGetSignedTokensUseCase = ReturnType<typeof getSignedTokensUrlUseCase>;

export const getSignedTokensUrlUseCase = (
    videosProviderService: IVideosService
) => async (playbackId: string, types: (keyof typeof TypeClaim)[]) => {
    return videosProviderService.getSignedTokens(playbackId, types);
}