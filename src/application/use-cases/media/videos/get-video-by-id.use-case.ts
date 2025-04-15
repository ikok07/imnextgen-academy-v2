import {IVideosRepository} from "@/src/application/repositories/media/videos/videos.repository.interface";

export type IGetVideoByIdUseCase = ReturnType<typeof getVideoByIdUseCase>;

export const getVideoByIdUseCase = (
    videosRepository: IVideosRepository
) => async (id: string) => {
    return videosRepository.getVideoById(id);
}