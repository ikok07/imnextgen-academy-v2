"use server"

import {getInjection} from "@/di/container";
import {
    CheckResourceOptions,
    CheckUserAccessOptions
} from "@/src/application/services/auth/authorization.service.interface";
import {createServerAction} from "@/app/_utils/createServerAction";

export const checkAccess = createServerAction((async (opts: Partial<CheckUserAccessOptions>) => {
    try {
        const checkAccessController = getInjection("ICheckAccessController");
        return await checkAccessController(opts);
    } catch(e) {
        return false;
    }
}));

export const checkMultipleResourcesAccess = createServerAction((async (opts: Partial<CheckResourceOptions>) => {
    try {
        const checkResourcesAccessController = getInjection("ICheckResourcesAccessController");
        return await checkResourcesAccessController(opts);
    } catch(e) {
        return [];
    }
}));