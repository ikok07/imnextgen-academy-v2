import {
    IDeleteMultipleSectionsUseCase
} from "@/src/application/use-cases/media/sections/delete-multiple-sections.use-case";

export type IDeleteMultipleSectionsController = ReturnType<typeof deleteMultipleSectionsController>;

export const deleteMultipleSectionsController = (
    deleteMultipleSectionsUseCase: IDeleteMultipleSectionsUseCase
) => async (sectionIds: string[]) => {

    if (sectionIds.length === 0) return;

    return deleteMultipleSectionsUseCase(sectionIds)
}