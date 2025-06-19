import {Module, ModuleInsert, modulesTable} from "@/drizzle/schema/modules";
import {IModulesRepository} from "@/src/application/repositories/media/modules/modules.repository.interface";
import {DatabaseError} from "@/src/entities/errors/db/database";
import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {eq, inArray, or} from "drizzle-orm";

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

    async updateModule(data: Partial<ModuleInsert>): Promise<Module> {
        try {
            const res = await this.queryDB(db => {
                return db.update(modulesTable).set(data).returning();
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
                return db.delete(modulesTable).where(eq(modulesTable.id, moduleId));
            });
        } catch(e) {
            throw new DatabaseError(`Failed to update module! ${e}`)
        }
    }

    async deleteMultipleModules(moduleIds: string[]): Promise<void> {
        try {
            await this.queryDB(db => {
                return db.delete(modulesTable).where(inArray(modulesTable.id, moduleIds));
            });
        } catch(e) {
            throw new DatabaseError(`Failed to update module! ${e}`)
        }
    }
}