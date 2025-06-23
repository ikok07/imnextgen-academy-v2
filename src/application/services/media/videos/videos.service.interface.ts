import {TypeClaim} from "@mux/mux-node/util/jwt-types";
import {z} from "zod";

export const getUploadLinkOptionsSchema = z.object({
    videoQuality: z.enum(["basic", "plus", "premium"]),
    playbackPolicy: z.array(z.enum(["public", "signed"])),
    maxResolutionTier: z.enum(["1080p", "1440p", "2160p"])
});

export const assetMetadataSchema = z.object({
    title: z.string().optional(),
    creator_id: z.string().optional(),
    external_id: z.string().optional()
});

export type GetUploadLinkOptions = z.infer<typeof getUploadLinkOptionsSchema>;
export type AssetMetadata = z.infer<typeof assetMetadataSchema>;

export interface IVideosService {
    getSignedTokens(playbackId: string, types: (keyof typeof TypeClaim)[]): Promise<Map<keyof typeof TypeClaim, string>>
    getUploadLink(opts: GetUploadLinkOptions): Promise<string>;
    updateAssetMetadata(assetId: string, options: AssetMetadata): Promise<void>
    deleteVideo(assetId: string): Promise<void>
}