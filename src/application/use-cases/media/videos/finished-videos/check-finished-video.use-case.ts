import {
    IFinishedVideosRepository
} from "@/src/application/repositories/media/videos/finished-videos.repository.interface";

export type ICheckFinishedVideoUseCase = ReturnType<typeof checkFinishedVideoUseCase>;

export const checkFinishedVideoUseCase = (
    finishedVideosRepository: IFinishedVideosRepository
) => (videoId: string, userId: string) => {
    return finishedVideosRepository.checkFinishedVideo(videoId, userId);
}