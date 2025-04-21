import {
    IFinishedVideosRepository
} from "@/src/application/repositories/media/videos/finished-videos.repository.interface";

export type IAddFinishedVideoUseCase = ReturnType<typeof addFinishedVideoUseCase>;

export const addFinishedVideoUseCase = (
    finishedVideosRepository: IFinishedVideosRepository
) => async (videoId: string, userId: string) => {
    return finishedVideosRepository.addFinishedVideo(videoId, userId)
}