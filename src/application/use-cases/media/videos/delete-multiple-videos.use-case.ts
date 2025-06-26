import {IVideosRepository} from "@/src/application/repositories/media/videos/videos.repository.interface";

export type IDeleteMultipleVideosUseCase = ReturnType<typeof deleteMultipleVideosUseCase>;

export const deleteMultipleVideosUseCase = (
    videosRepository: IVideosRepository
) => async (moduleId: string, videoIds: string[]) => {
    return videosRepository.deleteMultipleVideos(moduleId, videoIds);
}