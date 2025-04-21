"use server"

import {getInjection} from "@/di/container";
import {
    CheckResourceOptions,
    CheckUserAccessOptions
} from "@/src/application/services/auth/authorization.service.interface";
import {createServerAction} from "@/app/_utils/createServerAction";

export const getDbProfile = createServerAction(async (userId: string | undefined) => {
    const getProfileController = getInjection("IGetProfileController");
    return await getProfileController(userId);
})

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

export const generateJwtToken = createServerAction(async (data: object, expiresInSeconds: number) => {
    return getInjection("IGenerateJwtController")(data, expiresInSeconds);
});

export const validateJwtToken = createServerAction(async (token: string) => {
    return getInjection("IValidateJwtController")(token);
});