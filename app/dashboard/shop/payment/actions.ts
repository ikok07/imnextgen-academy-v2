"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";
import {ConfirmCheckout} from "@/src/application/services/payments/payment.service.interface";

export const confirmCheckout = createServerAction((customerEmail: string | undefined, checkout: ConfirmCheckout) => {
    return getInjection("IConfirmCheckoutController")(customerEmail, checkout)
});