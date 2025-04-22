import {UserBoughtModule} from "@/drizzle/schema/user_bought_modules";

export interface IUserBoughtModulesRepository {
    getBoughtModules(userId: string): Promise<UserBoughtModule[]>
    addBoughtModule(userId: string, moduleId: string): Promise<UserBoughtModule[]>
    removeBoughtModule(userId: string, moduleId: string): Promise<UserBoughtModule[]>
}