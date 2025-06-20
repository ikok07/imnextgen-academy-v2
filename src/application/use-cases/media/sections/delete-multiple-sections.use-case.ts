import {ISectionsRepository} from "@/src/application/repositories/media/sections/sections.repository.interface";

export type IDeleteMultipleSectionsUseCase = ReturnType<typeof deleteMultipleSectionsUseCase>;

export const deleteMultipleSectionsUseCase = (
    sectionsRepository: ISectionsRepository
) => async (moduleId: string, sectionIds: string[]) => {
    return sectionsRepository.deleteMultipleSections(moduleId, sectionIds)
}