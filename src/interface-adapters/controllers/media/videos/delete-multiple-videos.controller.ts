import {IDeleteMultipleVideosUseCase} from "@/src/application/use-cases/media/videos/delete-multiple-videos.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IDeleteMultipleVideosController = ReturnType<typeof deleteMultipleVideosController>;

export const deleteMultipleVideosController = (
    deleteMultipleVideosUseCase: IDeleteMultipleVideosUseCase
) => async (moduleId: string | undefined, videoIds: string[]) => {

    if (!moduleId) throw new InputParseError("Invalid moduleId!");

    return deleteMultipleVideosUseCase(moduleId, videoIds);
}