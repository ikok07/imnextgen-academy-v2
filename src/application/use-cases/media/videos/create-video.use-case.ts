import {IVideosRepository} from "@/src/application/repositories/media/videos/videos.repository.interface";
import {VideoInsert} from "@/drizzle/schema/videos";

export type ICreateVideoUseCase = ReturnType<typeof createVideoUseCase>;

export const createVideoUseCase = (
    videosRepository: IVideosRepository
) => async (moduleId: string, data: VideoInsert) => {
    return videosRepository.createVideo(moduleId, data);
}