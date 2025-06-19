import {Module, ModuleInsert, modulesTable} from "@/drizzle/schema/modules";
import {IModulesRepository} from "@/src/application/repositories/media/modules/modules.repository.interface";
import {DatabaseError} from "@/src/entities/errors/db/database";
import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {eq, gt, inArray, or, sql} from "drizzle-orm";
import {PgTransaction} from "drizzle-orm/pg-core";

export class ModulesRepository extends BaseRepository implements IModulesRepository {
    getModules(): Promise<Module[]> {
        try {
            return this.queryDB(db => {
                return db.query.modulesTable.findMany();
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get modules! ${e}`);
        }
    }

    getModulesByProductIds(productIds: string[]): Promise<Module[]> {
        try {
            return this.queryDB(db => {
                return db.query.modulesTable.findMany({
                    where: inArray(modulesTable.stripe_product_id, productIds)
                });
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get modules by product ids! ${e}`);
        }
    }

    getPaidModules(): Promise<Module[]> {
        try {
            return this.queryDB(db => {
                return db.query.modulesTable.findMany({where: or(eq(modulesTable.access, "subscription-or-paid"), eq(modulesTable.access, "paid"), eq(modulesTable.access, "pre-order"))});
            })
        } catch (e) {
            throw new DatabaseError(`Failed to get paid modules! ${e}`);
        }
    }

    async getModuleById(id: string): Promise<Module> {
        try {
            const result = await this.queryDB(db => {
                return db.query.modulesTable.findFirst({where: eq(modulesTable.id, id)});
            })

            if (!result) throw new Error("Could not find module!");

            return result;
        } catch(e) {
            throw new DatabaseError(`Failed to get modules! ${e}`)
        }
    }

    getModulesByIds(ids: string[]): Promise<Module[]> {
        try {
            return this.queryDB(db => {
                return db.query.modulesTable.findMany({where: inArray(modulesTable.id, ids)});
            });
        } catch(e) {
            throw new DatabaseError(`Failed to get modules! ${e}`)
        }
    }

    async createModule(data: ModuleInsert): Promise<Module> {
        try {
            const res = await this.queryDB(db => {
                return db.insert(modulesTable).values(data).returning();
            });
            if (res.length === 0) throw new Error("Failed to insert module into database!");
            return res[0];
        } catch(e) {
            throw new DatabaseError(`Failed to create module! ${e}`)
        }
    }

    async updateModule(moduleId: string, data: Partial<ModuleInsert>): Promise<Module> {
        try {
            const res = await this.queryDB(db => {
                return db.transaction(async tx => {
                    const moduleToUpdate = await tx.select().from(modulesTable).where(eq(modulesTable.id, moduleId)).then(rows => rows[0]);
                    const txResponse = await tx.update(modulesTable).set(data).where(eq(modulesTable.id, moduleId)).returning();

                    if (!!data?.order_number && moduleToUpdate.order_number != data.order_number) {
                        const updatedModules = await tx.select().from(modulesTable).then(rows => rows.sort((a, b) => a.order_number - b.order_number));
                        const updates: Promise<any>[] = [];
                        for (let i = 0; i < updatedModules.length; i++) {
                            if (updatedModules[i].order_number !== i) {
                                updates.push(
                                    tx.update(modulesTable).set({order_number: i}).where(eq(modulesTable.id, updatedModules[i].id))
                                )
                            }
                        }

                        await Promise.all(updates);
                    }

                    return txResponse;
                });
            });
            if (res.length === 0) throw new Error("Failed to update module in database!");
            return res[0];
        } catch(e) {
            throw new DatabaseError(`Failed to update module! ${e}`)
        }
    }

    async deleteModule(moduleId: string): Promise<void> {
        try {
            await this.queryDB(db => {
                return db.transaction(async tx => {
                    const moduleToDelete = await tx.select().from(modulesTable).where(eq(modulesTable.id, moduleId)).then(rows => rows[0]);

                    if (!moduleToDelete) throw new Error("Module not found!");

                    await tx.delete(modulesTable).where(eq(modulesTable.id, moduleId));

                    await tx.update(modulesTable)
                        .set({
                            order_number: sql`${modulesTable.order_number} - 1`
                        })
                        .where(gt(modulesTable.order_number, moduleToDelete.order_number));
                });
            });
        } catch(e) {
            throw new DatabaseError(`Failed to update module! ${e}`)
        }
    }

    async deleteMultipleModules(moduleIds: string[]): Promise<void> {
        try {
            await this.queryDB(db => {
                return db.transaction(async tx => {
                    await tx.delete(modulesTable).where(inArray(modulesTable.id, moduleIds));

                    const remainingModules = await tx.select().from(modulesTable).then(rows => rows.sort((a, b) => a.order_number - b.order_number));

                    const updates: Promise<any>[] = [];
                    for (let i = 0; i < remainingModules.length; i++) {
                        if (remainingModules[i].order_number !== i) {
                            updates.push(
                                tx.update(modulesTable).set({order_number: i}).where(eq(modulesTable.id, remainingModules[i].id))
                            )
                        }
                    }

                    await Promise.all(updates);
                });
            });
            return
        } catch(e) {
            throw new DatabaseError(`Failed to update module! ${e}`)
        }
    }
}