import {UserBoughtModule} from "@/drizzle/schema/user_bought_modules";
import {Module} from "@/drizzle/schema/modules";
import {Profile} from "@/drizzle/schema/profiles";

export interface IUserBoughtModulesRepository {
    getBoughtModules(userId: string): Promise<{ bought_module: UserBoughtModule, profile: Profile, module: Module }[]>
    addBoughtModules(userId: string, moduleIds: string[]): Promise<UserBoughtModule[]>
    removeBoughtModule(userId: string, moduleId: string): Promise<UserBoughtModule[]>
}