import {ICreateSectionUseCase} from "@/src/application/use-cases/media/sections/create-section.use-case";
import {SectionInsert, sectionsInsertSchema} from "@/drizzle/schema/sections";
import {InputParseError} from "@/src/entities/errors/common";

export type ICreateSectionController = ReturnType<typeof createSectionController>;

export const createSectionController = (
    createSectionUseCase: ICreateSectionUseCase
) => async (data: Partial<SectionInsert>) => {

    const {data: parsedData, error} = sectionsInsertSchema.safeParse(data);
    if (error) throw new InputParseError(`Invalid data! ${error}`);

    return createSectionUseCase(parsedData);
}