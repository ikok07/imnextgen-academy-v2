import {IAddFinishedVideoUseCase} from "@/src/application/use-cases/media/videos/finished-videos/add-finished-video.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IAddFinishedVideoController = ReturnType<typeof addFinishedVideoController>;

export const addFinishedVideoController = (
    addFinishedVideoUseCase: IAddFinishedVideoUseCase
) => async (videoId: string | undefined, userId: string | undefined) => {
    if (!videoId) throw new InputParseError("Invalid videoId!");
    if (!userId) throw new InputParseError("Invalid userId!");

    return addFinishedVideoUseCase(videoId, userId)
}