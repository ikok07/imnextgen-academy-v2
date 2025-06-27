import {
    IVideoResourcesRepository
} from "@/src/application/repositories/media/videos/video-resources.repository.interface";

export type IDeleteMultipleResourcesUseCase = ReturnType<typeof deleteMultipleResourcesUseCase>;

export const deleteMultipleResourcesUseCase = (
    videoResourcesRepository: IVideoResourcesRepository
) => async (resourceIds: string[]) => {
    return videoResourcesRepository.deleteMultipleResources(resourceIds);
}