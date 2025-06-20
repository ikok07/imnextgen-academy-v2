import {IUpdateSectionUseCase} from "@/src/application/use-cases/media/sections/update-section.use-case";
import {SectionInsert, sectionsInsertSchema} from "@/drizzle/schema/sections";
import {InputParseError} from "@/src/entities/errors/common";

export type IUpdateSectionController = ReturnType<typeof updateSectionController>;

export const updateSectionController = (
    updateSectionUseCase: IUpdateSectionUseCase
) => async (sectionId: string | undefined, data: Partial<SectionInsert>) => {

    if (!sectionId) throw new InputParseError("Invalid sectiondId!");

    const {data: parsedData, error} = sectionsInsertSchema.safeParse(data);
    if (error) throw new InputParseError(`Invalid data! ${error}`);

    return updateSectionUseCase(sectionId, parsedData);
}