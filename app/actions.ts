"use server"

import {getInjection} from "@/di/container";
import {
    CheckResourceOptions,
    CheckUserAccessOptions
} from "@/src/application/services/auth/authorization.service.interface";
import {createServerAction} from "@/app/_utils/createServerAction";
import {GetAllUsersForRoleOptions} from "@/src/application/services/auth/authentication.service.interface";
import {UserRoleType} from "@/drizzle/schema/user_roles";

export const getUser = createServerAction((opts?: {excludeDbProfile?: boolean, dbUserNullOnError?: boolean}) => {
    return getInjection("IGetUserController")(opts);
})

export const getDbProfile = createServerAction(async (userId: string | undefined) => {
    const getProfileController = getInjection("IGetProfileController");
    return await getProfileController(userId);
});

export const getAllProfilesForRole = createServerAction((role: UserRoleType | undefined) => {
    return getInjection("IGetAllProfilesForRoleController")(role);
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

export const getUserSubscription = createServerAction((userId: string | undefined) => {
    return getInjection("IGetUserSubscriptionsController")(userId);
})

export const getUserBoughtModules = createServerAction((userId: string | undefined) => {
    return getInjection("IGetUserBoughtModulesController")(userId);
})

export const generateJwtToken = createServerAction(async (data: object, expiresInSeconds: number) => {
    return getInjection("IGenerateJwtController")(data, expiresInSeconds);
});

export const validateJwtToken = createServerAction(async (token: string) => {
    return getInjection("IValidateJwtController")(token);
});