import {
    IVideoDescriptionsRepository
} from "@/src/application/repositories/media/videos/video-descriptions.repository.interface";
import {VideoDescriptionInsert} from "@/drizzle/schema/video_descriptions";

export type ICreateVideoDescriptionUseCase = ReturnType<typeof createVideoDescriptionUseCase>;

export const createVideoDescriptionUseCase = (
    videoDescriptionRepository: IVideoDescriptionsRepository
) => async (data: VideoDescriptionInsert) => {
    return videoDescriptionRepository.createVideoDescription(data);
}