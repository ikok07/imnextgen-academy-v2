import {IVideosRepository} from "@/src/application/repositories/media/videos/videos.repository.interface";
import {VideoInsert} from "@/drizzle/schema/videos";

export type IUpdateVideoUseCase = ReturnType<typeof updateVideoUseCase>;

export const updateVideoUseCase = (
    videosRepository: IVideosRepository
) => async (moduleId: string, videoId: string, data: Partial<VideoInsert>) => {
    return videosRepository.updateVideo(moduleId, videoId, data);
}