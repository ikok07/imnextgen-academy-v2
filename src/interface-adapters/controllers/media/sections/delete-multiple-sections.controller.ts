import {
    IDeleteMultipleSectionsUseCase
} from "@/src/application/use-cases/media/sections/delete-multiple-sections.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IDeleteMultipleSectionsController = ReturnType<typeof deleteMultipleSectionsController>;

export const deleteMultipleSectionsController = (
    deleteMultipleSectionsUseCase: IDeleteMultipleSectionsUseCase
) => async (moduleId: string, sectionIds: string[]) => {

    if (!moduleId) throw new InputParseError("Invalid moduleId!");
    if (sectionIds.length === 0) return;

    return deleteMultipleSectionsUseCase(moduleId, sectionIds)
}