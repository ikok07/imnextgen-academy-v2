import {
    ICreateVideoDescriptionUseCase
} from "@/src/application/use-cases/media/videos/video-descriptions/create-video-description.use-case";
import {VideoDescriptionInsert, videoDescriptionsInsertSchema} from "@/drizzle/schema/video_descriptions";
import {InputParseError} from "@/src/entities/errors/common";

export type ICreateVideoDescriptionController = ReturnType<typeof createVideoDescriptionController>;

export const createVideoDescriptionController = (
    createVideoDescriptionUseCase: ICreateVideoDescriptionUseCase
) => async (data: Partial<VideoDescriptionInsert>) => {

    const {data: parsedData, error} = videoDescriptionsInsertSchema.safeParse(data);
    if (error) throw new InputParseError(`Invalid data! ${error}`);

    return createVideoDescriptionUseCase(parsedData);
}