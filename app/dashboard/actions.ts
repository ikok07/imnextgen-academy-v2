"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";
import {cookies} from "next/headers";

export const getAllModules = createServerAction(async () => {
    const getModulesController = getInjection("IGetModulesController");
    return getModulesController();
});

export const getModuleById = createServerAction(async (id: string | undefined | null) => {
    const getModuleByIdController= getInjection("IGetModuleByIdController");
    return getModuleByIdController(id);
});

export const getSectionsForModule = createServerAction(async (moduleId: string | undefined | null) => {
    const getSectionsForModuleController = getInjection("IGetSectionsForModuleController");
    return getSectionsForModuleController(moduleId);
});

export const getVideosForSection = createServerAction(async (sectionId: string) => {

    const getVideosForSectionController = getInjection("IGetVideosForSectionController");
    return getVideosForSectionController(sectionId);
});

export const getVideosForModule = createServerAction(async (moduleId: string) => {
    const getVideosForModuleController = getInjection("IGetVideosForModuleController");
    return getVideosForModuleController(moduleId);
});

export const getFinishedVideos = createServerAction((moduleId: string | undefined | null, userId: string | undefined | null) => {
    const getFinishedVideosController = getInjection("IGetFinishedVideosController");
    return getFinishedVideosController(moduleId, userId);
});

export const checkFinishedVideo = createServerAction((videoId: string | undefined, userId: string | undefined) => {
    return getInjection("ICheckFinishedVideoController")(videoId, userId);
})

export const addFinishedVideo = createServerAction((videoId: string | undefined, userId: string | undefined) => {
    return getInjection("IAddFinishedVideoController")(videoId, userId);
});

export const removeFinishedVideo = createServerAction((videoId: string | undefined, userId: string | undefined) => {
    return getInjection("IRemoveFinishedVideoController")(videoId, userId);
});