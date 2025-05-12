import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {
    IUserBoughtModulesRepository
} from "@/src/application/repositories/payments/user-bought-modules.repository.interface";
import {UserBoughtModule, userBoughtModuleTable} from "@/drizzle/schema/user_bought_modules";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {and, eq} from "drizzle-orm";
import {Module, modulesTable} from "@/drizzle/schema/modules";
import {Profile, profilesTable} from "@/drizzle/schema/profiles";

export class UserBoughtModulesRepository extends BaseRepository implements IUserBoughtModulesRepository {
    getBoughtModules(userId: string): Promise<{ bought_module: UserBoughtModule, profile: Profile, module: Module }[]> {
        try {
            return this.queryDB(db => {
                return db
                    .select({
                        bought_module: userBoughtModuleTable,
                        profile: profilesTable,
                        module: modulesTable
                    })
                    .from(userBoughtModuleTable)
                    .innerJoin(profilesTable, eq(profilesTable.id, userBoughtModuleTable.profile_id))
                    .innerJoin(modulesTable, eq(modulesTable.id, userBoughtModuleTable.module_id))
                    .where(eq(userBoughtModuleTable.profile_id, userId));
            });
        } catch (e) {
            throw new DatabaseError(`Failed to get bought modules: ${e}`);
        }
    }
    addBoughtModules(userId: string, moduleIds: string[]): Promise<UserBoughtModule[]> {
        try {
            return this.queryDB(db => {
                return db.insert(userBoughtModuleTable).values(moduleIds.map(moduleId => ({
                    profile_id: userId,
                    module_id: moduleId
                }))).onConflictDoNothing().returning();
            });
        } catch (e) {
            throw new DatabaseError(`Failed to add bought module: ${e}`);
        }
    }
    removeBoughtModule(userId: string, moduleId: string): Promise<UserBoughtModule[]> {
        try {
            return this.queryDB(db => {
                return db.delete(userBoughtModuleTable).where(and(eq(userBoughtModuleTable.profile_id, userId), eq(userBoughtModuleTable.module_id, moduleId))).returning();
            });
        } catch (e) {
            throw new DatabaseError(`Failed to remove bought module: ${e}`);
        }
    }

}