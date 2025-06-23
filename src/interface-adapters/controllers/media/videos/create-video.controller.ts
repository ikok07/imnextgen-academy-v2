import {ICreateVideoUseCase} from "@/src/application/use-cases/media/videos/create-video.use-case";
import {VideoInsert, videosInsertSchema} from "@/drizzle/schema/videos";
import {InputParseError} from "@/src/entities/errors/common";

export type ICreateVideoController = ReturnType<typeof createVideoController>;

export const createVideoController = (
    createVideoUseCase: ICreateVideoUseCase
) => async (data: Partial<VideoInsert>) => {

    const {data: parsedData, error} = videosInsertSchema.safeParse(data);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    return createVideoUseCase(parsedData);
}