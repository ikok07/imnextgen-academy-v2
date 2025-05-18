import {IVideosService} from "@/src/application/services/media/videos/videos.service.interface";
import {MediaVideoError} from "@/src/entities/errors/media/videos/media-videos";
import Mux from "@mux/mux-node";
import {TypeClaim} from "@mux/mux-node/util/jwt-types";

export class MuxService implements IVideosService {

    mux = new Mux({tokenId: process.env.MUX_TOKEN_ID!, tokenSecret: process.env.MUX_API_TOKEN!});

    async getSignedTokens(playbackId: string, types: (keyof typeof TypeClaim)[]): Promise<Map<keyof typeof TypeClaim, string>> {
        try {
            const tokens: Map<keyof typeof TypeClaim, string> = new Map([]);
            for (const type of types) {
                tokens.set(
                    type,
                    await this.mux.jwt.signPlaybackId(
                        playbackId,
                        {
                            keyId: process.env.MUX_SIGNING_KEY_ID!,
                            keySecret: Buffer.from(process.env.MUX_PRIVATE_KEY_BASE64!, "base64").toString("ascii"),
                            expiration: "2h",
                            type
                        }
                    )
                )
            }
            return tokens;
        } catch (e) {
            throw new MediaVideoError(`Failed to sign MUX video url: ${e}`);
        }
    }
}