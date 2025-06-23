import {
    AssetMetadata,
    GetUploadLinkOptions, GetUploadLinkResponse,
    IVideosService
} from "@/src/application/services/media/videos/videos.service.interface";
import {MediaVideoError} from "@/src/entities/errors/media/videos/media-videos";
import Mux from "@mux/mux-node";
import {TypeClaim} from "@mux/mux-node/util/jwt-types";
import axios from "axios";

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
                            expiration: process.env.MUX_TOKEN_EXPIRATION!,
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

    async getUploadLink(opts: GetUploadLinkOptions): Promise<GetUploadLinkResponse> {
        try {
            const res = await this.mux.video.uploads.create({
                cors_origin: process.env.NEXT_PUBLIC_BASE_URL!,
                new_asset_settings: {
                    video_quality: opts.videoQuality,
                    playback_policy: opts.playbackPolicy,
                    max_resolution_tier: opts.maxResolutionTier,
                },
                timeout: 60 * 60 * 3 // Valid 3 hours
            });
            if (res.status === "errored") throw new Error(`URL creation failed! ${JSON.stringify(res)}`);

            return {
                uploadId: res.id,
                url: res.url
            };
        } catch (e) {
            throw new MediaVideoError(`Failed to get upload link! ${e}`);
        }
    }

    async getUploadData(uploadId: string): Promise<Mux.Video.Uploads.Upload> {
        try {
            return this.mux.video.uploads.retrieve(uploadId);
        } catch (e) {
            throw new MediaVideoError(`Failed to get upload data! ${e}`);
        }
    }

    async updateAssetMetadata(assetId: string, {title, creator_id, external_id}: AssetMetadata): Promise<void> {
        try {
            await axios.patch(`https://api.mux.com/video/v1/assets/${assetId}`, {
                meta: {
                    title,
                    creator_id,
                    external_id
                }
            }, {
                headers: {
                    Authorization: `Basic ${btoa(`${process.env.MUX_TOKEN_ID!}:${process.env.MUX_API_TOKEN!}`)}`
                }
            });
        } catch(e) {
            throw new MediaVideoError(`Failed to update assets! ${e}`);
        }
    }

    async deleteVideo(assetId: string): Promise<void> {
        try {
            await this.mux.video.assets.delete(assetId);
        } catch (e) {
            throw new MediaVideoError(`Failed to delete video! ${e}`);
        }
    }
}