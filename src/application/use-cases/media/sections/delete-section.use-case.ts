import {ISectionsRepository} from "@/src/application/repositories/media/sections/sections.repository.interface";

export type IDeleteSectionUseCase = ReturnType<typeof deleteSectionUseCase>;

export const deleteSectionUseCase = (
    sectionsRepository: ISectionsRepository
) => async (moduleId: string, sectionId: string) => {
    return sectionsRepository.deleteSection(moduleId, sectionId);
}