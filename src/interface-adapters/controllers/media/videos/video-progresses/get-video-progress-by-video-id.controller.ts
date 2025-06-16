import {
    IGetVideoProgressByVideoIdUseCase
} from "@/src/application/use-cases/media/videos/video-progresses/get-video-progress-by-video-id.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetVideoProgressByVideoIdController = ReturnType<typeof getVideoProgressByVideoIdController>;

export const getVideoProgressByVideoIdController = (
    getVideoProgressByVideoIdUseCase: IGetVideoProgressByVideoIdUseCase
) => async (userId: string | undefined, videoId: string | undefined) => {

    if (!userId) throw new InputParseError("Invalid userId!");
    if (!videoId) throw new InputParseError("Invalid videoId!");

    return getVideoProgressByVideoIdUseCase(userId, videoId);
}