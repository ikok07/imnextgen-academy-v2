import {Section, SectionInsert} from "@/drizzle/schema/sections";

export interface ISectionsRepository {
    getSectionById(sectionId: string) : Promise<Section>
    getSectionsForModule(moduleId: string): Promise<Section[]>
    createSection(data: SectionInsert) : Promise<Section>
    updateSection(data: SectionInsert) : Promise<Section>
    deleteSection(sectionId: string) : Promise<void>
    deleteMultipleSections(sectionIds: string[]) : Promise<void>
}