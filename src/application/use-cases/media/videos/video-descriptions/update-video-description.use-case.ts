import {
    IVideoDescriptionsRepository
} from "@/src/application/repositories/media/videos/video-descriptions.repository.interface";
import {VideoDescriptionInsert} from "@/drizzle/schema/video_descriptions";

export type IUpdateVideoDescriptionUseCase = ReturnType<typeof updateVideoDescriptionUseCase>;

export const updateVideoDescriptionUseCase = (
    videoDescriptionsRepository: IVideoDescriptionsRepository
) => async (videoId: string, data: Partial<VideoDescriptionInsert>) => {
    return videoDescriptionsRepository.updateVideoDescription(videoId, data);
}