import {IRemoveFinishedVideoUseCase} from "@/src/application/use-cases/media/videos/finished-videos/remove-finished-video.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IRemoveFinishedVideoController = ReturnType<typeof removeFinishedVideoController>;

export const removeFinishedVideoController = (
    removeFinishedVideoUseCase: IRemoveFinishedVideoUseCase
) => (videoId: string | undefined, userId: string | undefined) => {

    if (!videoId) throw new InputParseError("Invalid videoId!");
    if (!userId) throw new InputParseError("Invalid userId!");

    return removeFinishedVideoUseCase(videoId, userId);
}