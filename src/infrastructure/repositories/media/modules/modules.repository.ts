import {Module, modulesTable} from "@/drizzle/schema/modules";
import {IModulesRepository} from "@/src/application/repositories/media/modules/modules.repository.interface";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import { eq } from "drizzle-orm";

export class ModulesRepository extends BaseRepository implements IModulesRepository {
    getModules(): Promise<Module[]> {
        try {
            return this.queryDB(db => {
                return db.query.modulesTable.findMany();
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get modules! ${e}`)
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
}