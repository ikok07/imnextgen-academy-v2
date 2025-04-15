import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {ISectionsRepository} from "@/src/application/repositories/media/sections/sections.repository.interface";
import {Section, sectionsTable} from "@/drizzle/schema/sections";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {eq} from "drizzle-orm";
import {modulesTable} from "@/drizzle/schema/modules";

export class SectionsRepository extends BaseRepository implements ISectionsRepository {
    getSectionsForModule(moduleId: string): Promise<Section[]> {
        try {
            return this.queryDB(async db => {
                return (await db.select({sections: sectionsTable})
                    .from(sectionsTable)
                    .innerJoin(modulesTable, eq(modulesTable.id, sectionsTable.module_id))
                    .where(eq(modulesTable.id, moduleId))
                    .execute()).map(r => r.sections);
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get section for module! ${e}`)
        }
    }

}