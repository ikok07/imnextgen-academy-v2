import {ISectionsRepository} from "@/src/application/repositories/media/sections/sections.repository.interface";

export type IDeleteMultipleSectionsUseCase = ReturnType<typeof deleteMultipleSectionsUseCase>;

export const deleteMultipleSectionsUseCase = (
    sectionsRepository: ISectionsRepository
) => async (sectionIds: string[]) => {
    return sectionsRepository.deleteMultipleSections(sectionIds)
}