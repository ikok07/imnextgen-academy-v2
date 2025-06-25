"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";

export const getVideoById = createServerAction((videoId: string) => {
    return getInjection("IGetVideoByIdController")(videoId);
});

export const getVideoDescriptionById = createServerAction((id: string | undefined) => {
    return getInjection("IGetVideoDescriptionByIdController")(id);
});