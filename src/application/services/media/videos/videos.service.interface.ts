import {TypeClaim} from "@mux/mux-node/util/jwt-types";
import {z} from "zod";

export const getUploadLinkOptionsSchema = z.object({
    videoQuality: z.enum(["basic", "plus", "premium"]),
    playbackPolicy: z.array(z.enum(["public", "signed"])),
    maxResolutionTier: z.enum(["1080p", "1440p", "2160p"])
});

export type GetUploadLinkOptions = z.infer<typeof getUploadLinkOptionsSchema>;

export interface IVideosService {
    getSignedTokens(playbackId: string, types: (keyof typeof TypeClaim)[]): Promise<Map<keyof typeof TypeClaim, string>>
    getUploadLink(opts: GetUploadLinkOptions): Promise<string>;
    deleteVideo(assetId: string): Promise<void>
}