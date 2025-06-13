import {
    IFinishedVideosRepository
} from "@/src/application/repositories/media/videos/finished-videos.repository.interface";

export type IGetFinishedVideosForSectionUseCase = ReturnType<typeof getFinishedVideosForSectionUseCase>;

export const getFinishedVideosForSectionUseCase = (
    finishedVideosRepository: IFinishedVideosRepository
) => async (moduleId: string, sectionId: string, userId: string) => {
    return finishedVideosRepository.getFinishedVideosForSection(moduleId, sectionId, userId);
}