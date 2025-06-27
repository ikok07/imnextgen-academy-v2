import {
    IVideoResourcesRepository
} from "@/src/application/repositories/media/videos/video-resources.repository.interface";
import {VideoResourceInsert} from "@/drizzle/schema/video_resources";

export type ICreateResourceUseCase = ReturnType<typeof createResourceUseCase>;

export const createResourceUseCase = (
    videoResourcesRepository: IVideoResourcesRepository
) => async (data: VideoResourceInsert) => {
    return videoResourcesRepository.createResource(data);
}