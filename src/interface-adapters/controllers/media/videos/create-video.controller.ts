import {ICreateVideoUseCase} from "@/src/application/use-cases/media/videos/create-video.use-case";
import {VideoInsert, videosInsertSchema} from "@/drizzle/schema/videos";
import {InputParseError} from "@/src/entities/errors/common";

export type ICreateVideoController = ReturnType<typeof createVideoController>;

export const createVideoController = (
    createVideoUseCase: ICreateVideoUseCase
) => async (moduleId: string | undefined, data: Partial<VideoInsert>) => {

    if (!moduleId) throw new InputParseError("Invalid moduleId!");

    const {data: parsedData, error} = videosInsertSchema.safeParse(data);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    return createVideoUseCase(moduleId, parsedData);
}