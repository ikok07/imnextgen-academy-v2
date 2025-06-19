import {Module, ModuleInsert} from "@/drizzle/schema/modules";

export interface IModulesRepository {
    getModules(): Promise<Module[]>;
    getModulesByProductIds(productIds: string[]): Promise<Module[]>;
    getModuleById(id: string): Promise<Module>;
    getPaidModules(): Promise<Module[]>
    createModule(data: ModuleInsert): Promise<Module>
    updateModule(data: Partial<ModuleInsert>): Promise<Module>
    deleteModule(moduleId: string): Promise<void>
    deleteMultipleModules(moduleIds: string[]): Promise<void>
}