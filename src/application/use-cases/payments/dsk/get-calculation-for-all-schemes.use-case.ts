import {IDskService} from "@/src/application/services/payments/dsk.service.interface";
import {CalculationForAllSchemesOptions} from "@/src/entities/models/payments/dsk/calculation-for-all-schemes";

export type IGetCalculationForAllSchemesUseCase = ReturnType<typeof getCalculationForAllSchemesUseCase>;

export const getCalculationForAllSchemesUseCase = (
    dskService: IDskService
) => (opts: CalculationForAllSchemesOptions) => {
    return dskService.getCalculationForAllSchemes(opts);
}