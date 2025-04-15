import {IVideosRepository} from "@/src/application/repositories/media/videos/videos.repository.interface";

export type IGetVideosForSectionUseCase = ReturnType<typeof getVideosForSectionUseCase>;

export const getVideosForSectionUseCase = (
    videosRepository: IVideosRepository
) => async (sectionId: string) => {
    return videosRepository.getVideosForSection(sectionId)
}