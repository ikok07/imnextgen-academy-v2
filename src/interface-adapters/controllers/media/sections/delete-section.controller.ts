import {IDeleteSectionUseCase} from "@/src/application/use-cases/media/sections/delete-section.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IDeleteSectionController = ReturnType<typeof deleteSectionController>;

export const deleteSectionController = (
    deleteSectionUseCase: IDeleteSectionUseCase
) => async (moduleId: string | undefined, sectionId: string | undefined) => {

    if (!moduleId) throw new InputParseError("Invalid moduleId!");
    if (!sectionId) throw new InputParseError("Invalid sectionId!");

    return deleteSectionUseCase(moduleId, sectionId);
}