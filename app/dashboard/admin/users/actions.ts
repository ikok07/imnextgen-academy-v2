"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";
import {
    GetSpecificMeetingsByUserIdOptions
} from "@/src/application/repositories/meetings/user-specific-meetings.repository.interface";

export const getUserSpecificMeetingsByUserId = createServerAction((opts: Partial<GetSpecificMeetingsByUserIdOptions>) => {
    return getInjection("IGetSpecificMeetingsByUserIdController")(opts);
});