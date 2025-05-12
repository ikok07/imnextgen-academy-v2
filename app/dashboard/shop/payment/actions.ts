"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {CalculationForAllSchemesOptions} from "@/src/entities/models/payments/dsk/calculation-for-all-schemes";
import {getInjection} from "@/di/container";
import {SendDirectPayOptions} from "@/src/entities/models/payments/dsk/send-direct-pay-options";
import {DirectPayOptionsExtension} from "@/src/interface-adapters/controllers/payments/dsk/pay-direct.controller";

export const getCalculationForAllSchemes = createServerAction(async (opts: Partial<CalculationForAllSchemesOptions>) => {
    return await getInjection("IGetCalculationForAllSchemesController")(opts);
});

export const payDirect = createServerAction(async (
    userId: string | undefined,
    opts: Partial<Omit<Omit<SendDirectPayOptions, "orderId">, "items"> & DirectPayOptionsExtension>
) => {
    return await getInjection("IPayDirectController")(userId, opts);
})