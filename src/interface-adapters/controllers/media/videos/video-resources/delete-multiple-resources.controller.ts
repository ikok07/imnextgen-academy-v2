import {
    IDeleteMultipleResourcesUseCase
} from "@/src/application/use-cases/media/videos/video-resources/delete-multiple-resource.use-case";

export type IDeleteMultipleResourcesController = ReturnType<typeof deleteMultipleResourcesController>;

export const deleteMultipleResourcesController = (
    deleteMultipleResourcesUseCase: IDeleteMultipleResourcesUseCase
) => async (resourceIds: string[]) => {

    if (resourceIds.length === 0) return;

    return deleteMultipleResourcesUseCase(resourceIds);
}