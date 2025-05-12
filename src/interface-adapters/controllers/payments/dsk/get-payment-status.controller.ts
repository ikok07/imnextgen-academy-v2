import {IGetPaymentStatusUseCase} from "@/src/application/use-cases/payments/dsk/get-payment-status.use-case";
import {GetStatusOptions, getStatusOptionsSchema} from "@/src/entities/models/payments/dsk/get-status-options";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetPaymentStatusController = ReturnType<typeof getPaymentStatusController>;

export const getPaymentStatusController = (
    getPaymentStatusUseCase: IGetPaymentStatusUseCase
) => async (opts: Partial<GetStatusOptions>) => {

    const {data, error} = getStatusOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError(`Invalid options: ${error}`);

    return getPaymentStatusUseCase(data);
}