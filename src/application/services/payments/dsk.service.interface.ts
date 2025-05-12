import {
    CalculationForAllSchemes,
    CalculationForAllSchemesOptions
} from "@/src/entities/models/payments/dsk/calculation-for-all-schemes";
import {SendDirectPayOptions, SendDirectPayResults} from "@/src/entities/models/payments/dsk/send-direct-pay-options";

export interface IDskService {
    getCalculationForAllSchemes(opts: CalculationForAllSchemesOptions): Promise<CalculationForAllSchemes>
    sendDskPayDirect(opts: SendDirectPayOptions): Promise<SendDirectPayResults>
}