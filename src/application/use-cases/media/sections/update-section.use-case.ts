import {ISectionsRepository} from "@/src/application/repositories/media/sections/sections.repository.interface";
import {SectionInsert} from "@/drizzle/schema/sections";

export type IUpdateSectionUseCase = ReturnType<typeof updateSectionUseCase>;

export const updateSectionUseCase = (
    sectionsRepository: ISectionsRepository
) => async (sectionId: string, moduleId: string, data: Partial<SectionInsert>) => {
    return sectionsRepository.updateSection(sectionId, moduleId, data);
}