"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";

export const getAllModules = createServerAction(async () => {
    const getModulesController = getInjection("IGetModulesController");
    return getModulesController();
});

export const getFinishedVideos = createServerAction((moduleId: string | undefined | null, userId: string | undefined | null) => {
    const getFinishedVideosController = getInjection("IGetFinishedVideosController");
    return getFinishedVideosController(moduleId, userId);
})