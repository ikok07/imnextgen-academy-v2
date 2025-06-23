import {
    IVideoDescriptionsRepository
} from "@/src/application/repositories/media/videos/video-descriptions.repository.interface";

export type IDeleteVideoDescriptionUseCase = ReturnType<typeof deleteVideoDescriptionUseCase>;

export const deleteVideoDescriptionUseCase = (
    videoDescriptionRepository: IVideoDescriptionsRepository
) => async (id: string) => {
    return videoDescriptionRepository.deleteVideoDescription(id);
}