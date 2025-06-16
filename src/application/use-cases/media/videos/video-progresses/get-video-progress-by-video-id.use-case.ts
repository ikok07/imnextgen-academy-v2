import {
    IVideoProgressesRepository
} from "@/src/application/repositories/media/videos/video-progresses.repository.interface";

export type IGetVideoProgressByVideoIdUseCase = ReturnType<typeof getVideoProgressByVideoIdUseCase>;

export const getVideoProgressByVideoIdUseCase = (
    videoProgressesRepository: IVideoProgressesRepository
) => async (userId: string, videoId: string) => {
    const result = await videoProgressesRepository.getVideoProgressByVideoId(userId, videoId);
    if (!result) return undefined;
    return {video: result.video, progress: result.videoProgress.progress_percentage}
}