import {
    ISetVideoProgressUseCase
} from "@/src/application/use-cases/media/videos/video-progresses/set-video-progress.use-case";
import {
    VideoProgressesInsert,
    videoProgressesInsertSchema,
} from "@/drizzle/schema/video_progresses";
import {InputParseError} from "@/src/entities/errors/common";

export type ISetVideoProgressController = ReturnType<typeof setVideoProgressController>;

export const setVideoProgressController = (
    setVideoProgressUseCase: ISetVideoProgressUseCase
) => async (data: Partial<VideoProgressesInsert>) => {

    const {data: parsedDate, error} = videoProgressesInsertSchema.safeParse(data);
    if (error) throw new InputParseError(`Invalid data! ${error}`);

    return setVideoProgressUseCase(parsedDate);
}