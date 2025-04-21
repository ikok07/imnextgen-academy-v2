import {
    IFinishedVideosRepository
} from "@/src/application/repositories/media/videos/finished-videos.repository.interface";

export type IRemoveFinishedVideoUseCase = ReturnType<typeof removeFinishedVideoUseCase>;

export const removeFinishedVideoUseCase = (
    finishedVideosRepository: IFinishedVideosRepository
) => (videoId: string, userId: string) => {
    return finishedVideosRepository.removeFinishedVideo(videoId, userId);
}