import {TypeClaim} from "@mux/mux-node/util/jwt-types";

export interface IVideosService {
    getSignedTokens(playbackId: string, types: (keyof typeof TypeClaim)[]): Promise<Map<keyof typeof TypeClaim, string>>
}