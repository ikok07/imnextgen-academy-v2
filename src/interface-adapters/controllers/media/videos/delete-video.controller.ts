import {IDeleteVideoUseCase} from "@/src/application/use-cases/media/videos/delete-video.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IDeleteVideoController = ReturnType<typeof deleteVideoController>;

export const deleteVideoController = (
    deleteVideoUseCase: IDeleteVideoUseCase
) => async (moduleId: string | undefined, videoId: string | undefined) => {

    if (!moduleId) throw new InputParseError("Invalid moduleId!");
    if (!videoId) throw new InputParseError("Invalid videoId!");

    return deleteVideoUseCase(moduleId, videoId);
}