import {IUpdateSectionUseCase} from "@/src/application/use-cases/media/sections/update-section.use-case";
import {SectionInsert} from "@/drizzle/schema/sections";
import {InputParseError} from "@/src/entities/errors/common";

export type IUpdateSectionController = ReturnType<typeof updateSectionController>;

export const updateSectionController = (
    updateSectionUseCase: IUpdateSectionUseCase
) => async (sectionId: string | undefined, moduleId: string | undefined, data: Partial<SectionInsert>) => {

    if (!sectionId) throw new InputParseError("Invalid sectionId!");
    if (!moduleId) throw new InputParseError("Invalid moduleId!");

    return updateSectionUseCase(sectionId, moduleId, data);
}