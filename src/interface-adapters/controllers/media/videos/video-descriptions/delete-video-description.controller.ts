import {
    IDeleteVideoDescriptionUseCase
} from "@/src/application/use-cases/media/videos/video-descriptions/delete-video-description.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IDeleteVideoDescriptionController = ReturnType<typeof deleteVideoDescriptionController>;

export const deleteVideoDescriptionController = (
    deleteVideoDescriptionUseCase: IDeleteVideoDescriptionUseCase
) => async (id: string | undefined) => {

    if (!id) throw new InputParseError("Invalid id!");

    return deleteVideoDescriptionUseCase(id);
}