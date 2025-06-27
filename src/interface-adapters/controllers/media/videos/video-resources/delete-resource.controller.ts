import {
    IDeleteResourceUseCase
} from "@/src/application/use-cases/media/videos/video-resources/delete-resource.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IDeleteResourceController = ReturnType<typeof deleteResourceController>;

export const deleteResourceController = (
    deleteResourceUseCase: IDeleteResourceUseCase
) => async (resourceId: string | undefined) => {

    if (!resourceId) throw new InputParseError("Invalid resourceId!");

    return deleteResourceUseCase(resourceId);
}