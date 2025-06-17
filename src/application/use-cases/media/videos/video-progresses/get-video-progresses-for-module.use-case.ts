import {
    IVideoProgressesRepository
} from "@/src/application/repositories/media/videos/video-progresses.repository.interface";
import {ProgressVideo} from "@/src/entities/models/media/videos/progress-video";

export type IGetVideoProgressesForModuleUseCase = ReturnType<typeof getVideoProgressesForModuleUseCase>;

export const getVideoProgressesForModuleUseCase = (
    videoProgressesRepository: IVideoProgressesRepository
) => async (userId: string, moduleId: string) => {
    const rawResponse = await videoProgressesRepository.getVideoProgressesForModule(userId, moduleId);
    return rawResponse.map(item => ({video: item.video, progress: item.videoProgress.progress_percentage})) as ProgressVideo[];
}