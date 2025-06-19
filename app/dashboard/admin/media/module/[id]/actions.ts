"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";
import {ModuleInsert} from "@/drizzle/schema/modules";

export const updateModule = createServerAction((moduleId: string | undefined, data: Partial<ModuleInsert>) => {
   return getInjection("IUpdateModuleController")(moduleId, data);
});