import {
    CalculationForAllSchemes,
    CalculationForAllSchemesOptions
} from "@/src/entities/models/payments/dsk/calculation-for-all-schemes";
import {SendDirectPayOptions, SendDirectPayResults} from "@/src/entities/models/payments/dsk/send-direct-pay-options";
import {DSKPaymentStatus, GetStatusOptions} from "@/src/entities/models/payments/dsk/get-status-options";

export type DskDefaultResponse = {data: {status: number, result: object}} | {error: {status: number, message: string}};

export interface IDskService {
    getCalculationForAllSchemes(opts: CalculationForAllSchemesOptions): Promise<CalculationForAllSchemes>
    getDskPayStatus(opts: GetStatusOptions): Promise<DSKPaymentStatus>
    sendDskPayDirect(opts: SendDirectPayOptions): Promise<SendDirectPayResults>
}