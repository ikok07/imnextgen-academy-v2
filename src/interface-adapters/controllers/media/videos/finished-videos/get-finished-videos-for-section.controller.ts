import {
    IGetFinishedVideosForSectionUseCase
} from "@/src/application/use-cases/media/videos/finished-videos/get-finished-videos-for-section.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetFinishedVideosForSectionController = ReturnType<typeof getFinishedVideosForSectionController>;

export const getFinishedVideosForSectionController = (
    getFinishedVideosForSectionUseCase: IGetFinishedVideosForSectionUseCase
) => async (moduleId: string | undefined | null, sectionId: string | undefined | null, userId: string | undefined | null) => {

    if (!moduleId) throw new InputParseError("Invalid moduleId!");
    if (!sectionId) throw new InputParseError("Invalid sectionId!");
    if (!userId) throw new InputParseError("Invalid userId!");

    return getFinishedVideosForSectionUseCase(moduleId, sectionId, userId);
}