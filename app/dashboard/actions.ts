"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";
import {TypeClaim} from "@mux/mux-node/util/jwt-types";
import {VideoProgressesInsert} from "@/drizzle/schema/video_progresses";

export const getAllModules = createServerAction(() => {
    return getInjection("IGetModulesController")();
});

export const getModuleById = createServerAction((id: string | undefined | null) => {
    return getInjection("IGetModuleByIdController")(id);
});

export const getSectionsForModule = createServerAction((moduleId: string | undefined | null) => {
    return getInjection("IGetSectionsForModuleController")(moduleId);
});

export const getVideosForSection = createServerAction((sectionId: string | undefined | null) => {
    return getInjection("IGetVideosForSectionController")(sectionId);
});

export const getVideosForModule = createServerAction((moduleId: string) => {
    return getInjection("IGetVideosForModuleController")(moduleId);
});

export const getFinishedVideos = createServerAction((moduleId: string | undefined | null, userId: string | undefined | null) => {
    return getInjection("IGetFinishedVideosController")(moduleId, userId);
});

export const getFinishedVideosForSection = createServerAction((moduleId: string | undefined | null, sectionId: string | undefined | null, userId: string | undefined | null) => {
    return getInjection("IGetFinishedVideosForSectionController")(moduleId, sectionId, userId);
});

export const getFinishedVideosForAllSectionsInModule = createServerAction((moduleId: string | undefined | null, sectionId: string | undefined | null, userId: string | undefined | null) =>  {
    return getInjection("IGetFinishedVideosForAllSectionsInModuleController")(moduleId, userId);
});

export const checkFinishedVideo = createServerAction((videoId: string | undefined, userId: string | undefined) => {
    return getInjection("ICheckFinishedVideoController")(videoId, userId);
});

export const addFinishedVideo = createServerAction((videoId: string | undefined, userId: string | undefined) => {
    return getInjection("IAddFinishedVideoController")(videoId, userId);
});

export const setVideoProgress = createServerAction((data: Partial<VideoProgressesInsert>) => {
    console.log(data.progress_percentage);
    return getInjection("ISetVideoProgressController")(data);
});

export const removeFinishedVideo = createServerAction((videoId: string | undefined, userId: string | undefined) => {
    return getInjection("IRemoveFinishedVideoController")(videoId, userId);
});

export const getSignedTokens = createServerAction((playbackId: string | undefined, types: (keyof typeof TypeClaim)[] | undefined) => {
    return getInjection("IGetSignedTokensController")(playbackId, types);
});