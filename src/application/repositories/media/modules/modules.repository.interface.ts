import {Module} from "@/drizzle/schema/modules";

export interface IModulesRepository {
    getModules(): Promise<Module[]>;
    getModuleById(id: string): Promise<Module>;
    getPaidModules(): Promise<Module[]>
}