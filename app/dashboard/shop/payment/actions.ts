"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {CalculationForAllSchemesOptions} from "@/src/entities/models/payments/dsk/calculation-for-all-schemes";
import {getInjection} from "@/di/container";

export const getCalculationForAllSchemes = createServerAction(async (opts: Partial<CalculationForAllSchemesOptions>) => {
    return await getInjection("IGetCalculationForAllSchemesController")(opts);
});