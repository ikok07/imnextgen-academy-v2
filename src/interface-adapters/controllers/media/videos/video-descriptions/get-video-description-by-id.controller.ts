import {
    IGetVideoDescriptionByIdUseCase
} from "@/src/application/use-cases/media/videos/video-descriptions/get-video-description-by-id.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetVideoDescriptionByIdController = ReturnType<typeof getVideoDescriptionByIdController>;

export const getVideoDescriptionByIdController = (
    getVideoDescriptionByIdUseCase: IGetVideoDescriptionByIdUseCase
) => async (id: string | undefined) => {

    if (!id) throw new InputParseError("Invalid id!");
    
    return getVideoDescriptionByIdUseCase(id);
}