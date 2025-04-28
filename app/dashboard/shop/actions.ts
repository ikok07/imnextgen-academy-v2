"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";

export const getFullSubscriptionTiers = createServerAction(() => {
    return getInjection("IGetFullSubscriptionTiersController")();
});

export const getPaymentProductById = createServerAction((productId: string | undefined) => {
    return getInjection("IGetProductController")(productId);
})