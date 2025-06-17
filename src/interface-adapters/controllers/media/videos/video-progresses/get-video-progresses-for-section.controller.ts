import {
    IGetVideoProgressesForSectionUseCase
} from "@/src/application/use-cases/media/videos/video-progresses/get-video-progresses-for-section.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetVideoProgressesForSectionController = ReturnType<typeof getVideoProgressesForSectionController>;

export const getVideoProgressesForSectionController = (
    getVideoProgressesForSectionUseCase: IGetVideoProgressesForSectionUseCase
) => async (userId: string | undefined, sectionId: string | undefined) => {

    if (!userId) throw new InputParseError("Invalid userId!");
    if (!sectionId) throw new InputParseError("Invalid sectionId!");
    
    return getVideoProgressesForSectionUseCase(userId, sectionId);
}