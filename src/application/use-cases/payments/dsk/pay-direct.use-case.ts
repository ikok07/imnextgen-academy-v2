import {IDskService} from "@/src/application/services/payments/dsk.service.interface";
import {SendDirectPayOptions} from "@/src/entities/models/payments/dsk/send-direct-pay-options";

export type IPayDirectUseCase = ReturnType<typeof payDirectUseCase>;

export const payDirectUseCase = (
    dskService: IDskService
) => async (opts: SendDirectPayOptions) => {
    return dskService.sendDskPayDirect(opts);
}