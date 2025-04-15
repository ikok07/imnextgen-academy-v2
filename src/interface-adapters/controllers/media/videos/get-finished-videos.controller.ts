import {IGetFinishedVideosUseCase} from "@/src/application/use-cases/media/videos/get-finished-videos.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetFinishedVideosController = ReturnType<typeof getFinishedVideosController>;

export const getFinishedVideosController = (
    getFinishedVideosUseCase: IGetFinishedVideosUseCase
) => async (moduleId: string | undefined | null, userId: string | undefined | null) => {

    if (!moduleId) throw new InputParseError("Invalid moduleId!");
    if (!userId) throw new InputParseError("Invalid userId!");

    return getFinishedVideosUseCase(moduleId, userId);
}