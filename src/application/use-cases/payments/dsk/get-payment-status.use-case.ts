import {IDskService} from "@/src/application/services/payments/dsk.service.interface";
import {GetStatusOptions} from "@/src/entities/models/payments/dsk/get-status-options";

export type IGetPaymentStatusUseCase = ReturnType<typeof getPaymentStatusUseCase>;

export const getPaymentStatusUseCase = (
    dskService: IDskService
) => (opts: GetStatusOptions) => {
    return dskService.getDskPayStatus(opts);
}