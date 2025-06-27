import {
    ICreateResourceUseCase
} from "@/src/application/use-cases/media/videos/video-resources/create-resource.use-case";
import {VideoResourceInsert, videoResourceInsertSchema} from "@/drizzle/schema/video_resources";
import {InputParseError} from "@/src/entities/errors/common";

export type ICreateResourceController = ReturnType<typeof createResourceController>;

export const createResourceController = (
    createResourceUseCase: ICreateResourceUseCase
) => async (data: Partial<VideoResourceInsert>) => {

    const {data: parsedData, error} = videoResourceInsertSchema.safeParse(data);
    if (error) throw new InputParseError("Invalid data!");

    return createResourceUseCase(parsedData);
}