import {
    IVideoProgressesRepository
} from "@/src/application/repositories/media/videos/video-progresses.repository.interface";
import {ProgressVideo} from "@/src/entities/models/media/videos/ProgressVideo";

export type IGetVideoProgressesForSectionUseCase = ReturnType<typeof getVideoProgressesForSectionUseCase>;

export const getVideoProgressesForSectionUseCase = (
    videoProgressesRepository: IVideoProgressesRepository
) => async (userId: string, sectionId: string) => {
    const rawResponse = await videoProgressesRepository.getVideoProgressesForSection(userId, sectionId);
    return rawResponse.map(item => ({video: item.video, progress: item.videoProgress.progress_percentage})) as ProgressVideo[];
}