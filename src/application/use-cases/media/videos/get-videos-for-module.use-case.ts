import {IVideosRepository} from "@/src/application/repositories/media/videos/videos.repository.interface";

export type IGetVideosForModuleUseCase = ReturnType<typeof getVideosForModuleUseCase>;

export const getVideosForModuleUseCase = (
    videosRepository: IVideosRepository
) => async (moduleId: string) => {
    return videosRepository.getVideosForModule(moduleId)
}