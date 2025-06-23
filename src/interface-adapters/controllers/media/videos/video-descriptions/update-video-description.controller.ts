import {
    IUpdateVideoDescriptionUseCase
} from "@/src/application/use-cases/media/videos/video-descriptions/update-video-description.use-case";
import {VideoDescriptionInsert} from "@/drizzle/schema/video_descriptions";
import {InputParseError} from "@/src/entities/errors/common";

export type IUpdateVideoDescriptionController = ReturnType<typeof updateVideoDescriptionController>;

export const updateVideoDescriptionController = (
    updateVideoDescriptionUseCase: IUpdateVideoDescriptionUseCase
) => async (videoId: string | undefined, data: Partial<VideoDescriptionInsert>) => {

    if (!videoId) throw new InputParseError("Invalid videoId!");

    return updateVideoDescriptionUseCase(videoId, data);
}