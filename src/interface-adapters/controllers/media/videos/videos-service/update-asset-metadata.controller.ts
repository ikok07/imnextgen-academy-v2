import {
    IUpdateAssetMetadataUseCase
} from "@/src/application/use-cases/media/videos/videos-service/update-asset-metadata.use-case";
import {AssetMetadata, assetMetadataSchema} from "@/src/application/services/media/videos/videos.service.interface";
import {InputParseError} from "@/src/entities/errors/common";

export type IUpdateAssetMetadataController = ReturnType<typeof updateAssetMetadataController>;

export const updateAssetMetadataController = (
    updateAssetMetadataUseCase: IUpdateAssetMetadataUseCase
) => async (assetId: string | undefined, opts: Partial<AssetMetadata>) => {

    if (!assetId) throw new InputParseError("Invalid assetId!");

    const {data: parsedOpts, error} = assetMetadataSchema.safeParse(opts);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    return updateAssetMetadataUseCase(assetId, parsedOpts);
}