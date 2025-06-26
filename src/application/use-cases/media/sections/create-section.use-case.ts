import {ISectionsRepository} from "@/src/application/repositories/media/sections/sections.repository.interface";
import {SectionInsert} from "@/drizzle/schema/sections";

export type ICreateSectionUseCase = ReturnType<typeof createSectionUseCase>;

export const createSectionUseCase = (
    sectionsRepository: ISectionsRepository
) => async (data: SectionInsert) => {
    return sectionsRepository.createSection(data);
}