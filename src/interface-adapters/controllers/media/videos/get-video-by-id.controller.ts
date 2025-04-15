import {IGetVideoByIdUseCase} from "@/src/application/use-cases/media/videos/get-video-by-id.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetVideoByIdController = ReturnType<typeof getVideoByIdController>;

export const getVideoByIdController = (
    getVideosByIdUseCase: IGetVideoByIdUseCase
) => async (id: string | undefined | null) => {

    if (!id) throw new InputParseError("Invalid id!");

    return getVideosByIdUseCase(id);
}