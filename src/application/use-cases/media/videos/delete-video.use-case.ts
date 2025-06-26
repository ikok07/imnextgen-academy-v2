import {IVideosRepository} from "@/src/application/repositories/media/videos/videos.repository.interface";

export type IDeleteVideoUseCase = ReturnType<typeof deleteVideoUseCase>;

export const deleteVideoUseCase = (
    videosRepository: IVideosRepository
) => async (moduleId: string, videoId: string) => {
    return videosRepository.deleteVideo(moduleId, videoId);
}