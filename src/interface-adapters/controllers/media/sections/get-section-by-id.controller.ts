import {IGetSectionByIdUseCase} from "@/src/application/use-cases/media/sections/get-section-by-id.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetSectionByIdController = ReturnType<typeof getSectionByIdController>;

export const getSectionByIdController = (
    getSectionByIdUseCase: IGetSectionByIdUseCase
) => async (sectionId: string | undefined) => {
    
    if (!sectionId) throw new InputParseError("Invalid sectionId!");

    return getSectionByIdUseCase(sectionId);
}