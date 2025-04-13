"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";

export const getAllModules = createServerAction(async () => {
    const getModulesController = getInjection("IGetModulesController");
    return getModulesController();
})