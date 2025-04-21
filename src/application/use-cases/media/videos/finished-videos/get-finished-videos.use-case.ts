import {IFinishedVideosRepository} from "@/src/application/repositories/media/videos/finished-videos.repository.interface";

export type IGetFinishedVideosUseCase = ReturnType<typeof getFinishedVideosUseCase>;

export const getFinishedVideosUseCase = (
    finishedVideosRepository: IFinishedVideosRepository
) => async (moduleId: string, userId: string) => {
    return finishedVideosRepository.getFinishedVideosForModule(moduleId, userId);
}