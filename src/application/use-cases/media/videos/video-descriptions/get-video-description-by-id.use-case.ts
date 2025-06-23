import {
    IVideoDescriptionsRepository
} from "@/src/application/repositories/media/videos/video-descriptions.repository.interface";

export type IGetVideoDescriptionByIdUseCase = ReturnType<typeof getVideoDescriptionByIdUseCase>;

export const getVideoDescriptionByIdUseCase = (
    videoDescriptionsRepository: IVideoDescriptionsRepository
) => async (id: string) => {
    return videoDescriptionsRepository.getVideoDescriptionById(id);
}