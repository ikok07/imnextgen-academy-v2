import {
    IVideoResourcesRepository
} from "@/src/application/repositories/media/videos/video-resources.repository.interface";

export type IDeleteResourceUseCase = ReturnType<typeof deleteResourceUseCase>;

export const deleteResourceUseCase = (
    videoResourcesRepository: IVideoResourcesRepository
) => async (resourceId: string) => {
    return videoResourcesRepository.deleteResource(resourceId);
}