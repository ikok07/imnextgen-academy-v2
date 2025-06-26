import {ISectionsRepository} from "@/src/application/repositories/media/sections/sections.repository.interface";

export type IGetSectionByIdUseCase = ReturnType<typeof getSectionByIdUseCase>;

export const getSectionByIdUseCase = (
    sectionsRepository: ISectionsRepository
) => async (sectionId: string) => {
    return sectionsRepository.getSectionById(sectionId);
}