"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";
import {User} from "@clerk/backend";
import {GetUserResponse} from "@/src/application/services/auth/authentication.service.interface";

export const getUser = createServerAction<GetUserResponse>(async () => {
    const getUserController = getInjection("IGetUserController");
    return await getUserController();
})