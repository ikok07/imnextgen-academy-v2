import {Section, SectionInsert} from "@/drizzle/schema/sections";

export interface ISectionsRepository {
    getSectionById(sectionId: string) : Promise<Section>
    getSectionsForModule(moduleId: string): Promise<Section[]>
    createSection(data: SectionInsert) : Promise<Section>
    updateSection(sectionId: string, data: Partial<SectionInsert>) : Promise<Section>
    deleteSection(moduleId: string, sectionId: string) : Promise<void>
    deleteMultipleSections(moduleId: string, sectionIds: string[]) : Promise<void>
}