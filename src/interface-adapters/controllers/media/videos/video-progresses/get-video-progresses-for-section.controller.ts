import {
    IGetVideoProgressesForSectionUseCase
} from "@/src/application/use-cases/media/videos/video-progresses/get-video-progresses-for-section.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetVideoProgressesForSectionController = ReturnType<typeof getVideoProgressesForSectionController>;

export const getVideoProgressesForSectionController = (
    getVideoProgressesForSectionUseCase: IGetVideoProgressesForSectionUseCase
) => async (userId: string | undefined, moduleId: string | undefined) => {

    if (!userId) throw new InputParseError("Invalid userId!");
    if (!moduleId) throw new InputParseError("Invalid moduleId!");
    
    return getVideoProgressesForSectionUseCase(userId, moduleId);
}