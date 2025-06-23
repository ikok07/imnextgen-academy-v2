import {IDeleteVideoUseCase} from "@/src/application/use-cases/media/videos/videos-service/delete-video.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IDeleteVideoController = ReturnType<typeof deleteVideoController>;

export const deleteVideoController = (
    deleteVideoUseCase: IDeleteVideoUseCase
) => async (assetId: string | undefined) => {

    if (!assetId) throw new InputParseError("Invalid assetId!");

    return deleteVideoUseCase(assetId);
}