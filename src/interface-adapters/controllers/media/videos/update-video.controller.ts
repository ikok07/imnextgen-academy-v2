import {IUpdateVideoUseCase} from "@/src/application/use-cases/media/videos/update-video-use-case";
import {VideoInsert} from "@/drizzle/schema/videos";
import {InputParseError} from "@/src/entities/errors/common";

export type IUpdateVideoController = ReturnType<typeof updateVideoController>;

export const updateVideoController = (
    updateVideoUseCase: IUpdateVideoUseCase
) => async (moduleId: string | undefined, videoId: string | undefined, data: Partial<VideoInsert>) => {
    
    if (!moduleId) throw new InputParseError("Invalid moduleId!");
    if (!videoId) throw new InputParseError("Invalid videoId!");

    return updateVideoUseCase(moduleId, videoId, data);
}