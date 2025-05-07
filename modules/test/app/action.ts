"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";

export const testMethod = createServerAction(async () => {
    await getInjection("ITestMethodController")();
})