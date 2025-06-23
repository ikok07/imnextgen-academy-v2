import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {ISectionsRepository} from "@/src/application/repositories/media/sections/sections.repository.interface";
import {Section, SectionInsert, sectionsTable} from "@/drizzle/schema/sections";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {and, eq, gt, inArray, sql} from "drizzle-orm";
import {modulesTable} from "@/drizzle/schema/modules";

export class SectionsRepository extends BaseRepository implements ISectionsRepository {
    getSectionById(sectionId: string) : Promise<Section> {
        try {
            return this.queryDB(async db => {
                const res = await db.select()
                        .from(sectionsTable)
                        .where(eq(sectionsTable.id, sectionId));
                if (res.length === 0) throw new Error("Section not found!");
                return res[0];
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get section by id! ${e}`)
        }
    }

    getSectionsForModule(moduleId: string): Promise<Section[]> {
        try {
            return this.queryDB(db => {
                return db.select()
                    .from(sectionsTable)
                    .where(eq(sectionsTable.module_id, moduleId));
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get section for module! ${e}`)
        }
    }

    createSection(data: SectionInsert) : Promise<Section> {
        try {
            return this.queryDB(async db => {
                const res = await db.insert(sectionsTable).values(data).returning();
                if (res.length === 0) throw new Error("Section not created!");
                return res[0];
            })
        } catch(e) {
            throw new DatabaseError(`Failed to create section! ${e}`)
        }
    }

    updateSection(sectionId: string, moduleId: string, data: Partial<SectionInsert>) : Promise<Section> {
        try {
            return this.queryDB(async db => {
                return db.transaction(async tx => {
                    const sectionToUpdate = await tx.select().from(sectionsTable).where(eq(sectionsTable.id, sectionId)).then(rows => rows[0]);
                    if (!sectionToUpdate) throw new Error("Section not found!");

                    const res = await tx.update(sectionsTable).set(data).where(eq(sectionsTable.id, sectionId)).returning();
                    if (res.length === 0) throw new Error("Section not created!");

                    if (data.order_number !== undefined && data.order_number !== null) {
                        const newNumberIsHigher = data.order_number > sectionToUpdate.order_number;
                        // Sort the updated modules in the right order
                        const updatedSections = await tx.select().from(sectionsTable).where(eq(sectionsTable.module_id, moduleId)).then(rows => rows.sort((a, b) => {
                            if (a.order_number === data.order_number && b.order_number === data.order_number) {
                                if (newNumberIsHigher) {
                                    // Updated module is in front of the other duplicate
                                    return a.id === sectionId ? 1 : -1;
                                } else {
                                    // Updated module is behind the other duplicate
                                    return a.id === sectionId ? -1 : 1;
                                }
                            }

                            return a.order_number - b.order_number;
                        }));

                        for (let i = 0; i < updatedSections.length; i++) {
                            await tx.update(sectionsTable).set({order_number: i}).where(eq(sectionsTable.id, updatedSections[i].id));
                        }
                    }

                    return res[0];
                })
            })
        } catch(e) {
            throw new DatabaseError(`Failed to create section! ${e}`)
        }
    }

    deleteSection(moduleId: string, sectionId: string) : Promise<void> {
        try {
            return this.queryDB(async db => {
                return db.transaction(async tx => {
                    const sectionToDelete = await tx.select().from(sectionsTable).where(eq(sectionsTable.id, sectionId)).then(rows => rows[0]);

                    if (!sectionToDelete) throw new Error("Section not found!");

                    await tx.delete(sectionsTable).where(eq(sectionsTable.id, sectionId));

                    await tx.update(sectionsTable)
                        .set({
                            order_number: sql`${sectionsTable.order_number} - 1`
                        })
                        .where(and(eq(sectionsTable.module_id, moduleId), gt(sectionsTable.order_number, sectionToDelete.order_number)));
                })
            })
        } catch(e) {
            throw new DatabaseError(`Failed to delete section! ${e}`)
        }
    }

    deleteMultipleSections(moduleId: string, sectionIds: string[]) : Promise<void> {
        try {
            return this.queryDB(async db => {
                return db.transaction(async tx => {
                    await tx.delete(sectionsTable).where(inArray(sectionsTable.id, sectionIds)).returning();

                    const remainingSections = await tx.select().from(sectionsTable).where(eq(sectionsTable.module_id, moduleId)).then(rows => rows.sort((a, b) => a.order_number - b.order_number));

                    const updates: Promise<any>[] = [];
                    for (let i = 0; i < remainingSections.length; i++) {
                        if (remainingSections[i].order_number !== i) {
                            updates.push(
                                tx.update(sectionsTable).set({order_number: i}).where(eq(sectionsTable.id, remainingSections[i].id))
                            )
                        }
                    }

                    await Promise.all(updates);
                });
            })
        } catch(e) {
            throw new DatabaseError(`Failed to delete multiple sections! ${e}`)
        }
    }
}