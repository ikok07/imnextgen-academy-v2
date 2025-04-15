import {ISectionsRepository} from "@/src/application/repositories/media/sections/sections.repository.interface";

export type IGetSectionsForModuleUseCase = ReturnType<typeof getSectionsForModuleUseCase>;

export const getSectionsForModuleUseCase = (
    sectionsRepository: ISectionsRepository
) => async (moduleId: string) => {
    return sectionsRepository.getSectionsForModule(moduleId);
}