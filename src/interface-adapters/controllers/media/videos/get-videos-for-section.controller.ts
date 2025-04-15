import {IGetVideosForSectionUseCase} from "@/src/application/use-cases/media/videos/get-videos-for-section.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetVideosForSectionController = ReturnType<typeof getVideosForSectionController>;

export const getVideosForSectionController = (
    getVideosForSectionUseCase: IGetVideosForSectionUseCase
) => async (sectionId: string | undefined | null) => {

    if (!sectionId) throw new InputParseError("Invalid sectionId!");

    return getVideosForSectionUseCase(sectionId)
}