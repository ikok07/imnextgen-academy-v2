import {IGetAssetByIdUseCase} from "@/src/application/use-cases/media/videos/videos-service/get-asset-by-id.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetAssetByIdController = ReturnType<typeof getAssetByIdController>;

export const getAssetByIdController = (
    getAssetByIdUseCase: IGetAssetByIdUseCase
) => async (assetId: string | undefined) => {

    if (!assetId) throw new InputParseError("Invalid assetId!");

    return getAssetByIdUseCase(assetId);
}