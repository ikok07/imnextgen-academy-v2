import {
    IVideoDescriptionsRepository
} from "@/src/application/repositories/media/videos/video-descriptions.repository.interface";

export type IGetVideoDescriptionsUseCase = ReturnType<typeof getVideoDescriptionsUseCase>;

export const getVideoDescriptionsUseCase = (
    videoDescriptionsRepository: IVideoDescriptionsRepository
) => async () => {
    return videoDescriptionsRepository.getVideoDescriptions();
}