"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";
import { CreateCheckoutSessionOptions } from "@/src/application/services/payments/payment.service.interface";

export const getFullSubscriptionTiers = createServerAction(() => {
    return getInjection("IGetFullSubscriptionTiersController")();
});

export const getPaymentProductById = createServerAction((productId: string | undefined) => {
    return getInjection("IGetProductController")(productId);
});

export const createCheckoutSession = createServerAction((opts: Partial<CreateCheckoutSessionOptions>) => {
    return getInjection("ICreateCheckoutSessionController")(opts)
})

export const getPaidModules = createServerAction(() => {
    return getInjection("IGetPaidModulesController")();
})