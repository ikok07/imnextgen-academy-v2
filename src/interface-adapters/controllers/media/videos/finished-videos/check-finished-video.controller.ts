import {ICheckFinishedVideoUseCase} from "@/src/application/use-cases/media/videos/finished-videos/check-finished-video.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type ICheckFinishedVideoController = ReturnType<typeof checkFinishedVideoController>;

export const checkFinishedVideoController = (
    checkFinishedVideoUseCase: ICheckFinishedVideoUseCase
) => (videoId: string | undefined, userId: string | undefined) => {

    if (!videoId) throw new InputParseError("Invalid videoId!");
    if (!userId) throw new InputParseError("Invalid userId!");

    return checkFinishedVideoUseCase(videoId, userId);
}