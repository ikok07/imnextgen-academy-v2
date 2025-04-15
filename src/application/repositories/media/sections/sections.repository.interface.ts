import {Section} from "@/drizzle/schema/sections";

export interface ISectionsRepository {
    getSectionsForModule(moduleId: string): Promise<Section[]>
}