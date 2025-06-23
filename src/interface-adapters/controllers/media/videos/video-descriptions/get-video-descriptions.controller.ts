import {
    IGetVideoDescriptionsUseCase
} from "@/src/application/use-cases/media/videos/video-descriptions/get-video-descriptions.use-case";

export type IGetVideoDescriptionsController = ReturnType<typeof getVideoDescriptionsController>;

export const getVideoDescriptionsController = (
    getVideoDescriptionsUseCase: IGetVideoDescriptionsUseCase
) => async () => {
    return getVideoDescriptionsUseCase();
}