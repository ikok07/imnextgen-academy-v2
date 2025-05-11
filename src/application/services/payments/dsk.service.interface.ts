import {
    CalculationForAllSchemes,
    CalculationForAllSchemesOptions
} from "@/src/entities/models/payments/dsk/calculation-for-all-schemes";

export interface IDskService {
    getCalculationForAllSchemes(opts: CalculationForAllSchemesOptions): Promise<CalculationForAllSchemes>
}