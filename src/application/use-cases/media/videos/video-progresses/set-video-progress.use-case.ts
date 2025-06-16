import {
    IVideoProgressesRepository
} from "@/src/application/repositories/media/videos/video-progresses.repository.interface";
import {VideoProgressesInsert} from "@/drizzle/schema/video_progresses";

export type ISetVideoProgressUseCase = ReturnType<typeof setVideoProgressUseCase>;

export const setVideoProgressUseCase = (
    videoProgressesRepository: IVideoProgressesRepository
) => async (data: VideoProgressesInsert) => {
    return videoProgressesRepository.setVideoProgress(data);
}