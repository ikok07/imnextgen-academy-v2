import {TypeClaim} from "@mux/mux-node/util/jwt-types";
import {z} from "zod";
import Mux from "@mux/mux-node";

export const getUploadLinkOptionsSchema = z.object({
    videoQuality: z.enum(["basic", "plus", "premium"]),
    playbackPolicy: z.array(z.enum(["public", "signed"])),
    maxResolutionTier: z.enum(["1080p", "1440p", "2160p"])
});

export const getUploadLinkResponseSchema = z.object({
    url: z.string(),
    uploadId: z.string()
});

export const assetMetadataSchema = z.object({
    title: z.string().optional(),
    creator_id: z.string().optional(),
    external_id: z.string().optional()
});

export type GetUploadLinkOptions = z.infer<typeof getUploadLinkOptionsSchema>;
export type GetUploadLinkResponse = z.infer<typeof getUploadLinkResponseSchema>;
export type AssetMetadata = z.infer<typeof assetMetadataSchema>;

export interface IVideosService {
    getSignedTokens(playbackId: string, types: (keyof typeof TypeClaim)[]): Promise<Map<keyof typeof TypeClaim, string>>
    getUploadData(uploadId: string): Promise<Mux.Video.Uploads.Upload>
    getUploadLink(opts: GetUploadLinkOptions): Promise<GetUploadLinkResponse>;
    updateAssetMetadata(assetId: string, options: AssetMetadata): Promise<void>
    deleteVideo(assetId: string): Promise<void>
}