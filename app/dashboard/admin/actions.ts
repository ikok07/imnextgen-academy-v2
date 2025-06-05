"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";

export const deleteMultipleUsers = createServerAction(async (userIds: (string | undefined)[]) => {
    await getInjection("IDeleteMultipleUsersController")(userIds);
})