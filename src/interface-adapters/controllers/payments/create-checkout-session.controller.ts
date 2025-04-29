import {ICreateCheckoutSessionUseCase} from "@/src/application/use-cases/payments/create-checkout-session.use-case";
import {CreateCheckoutSessionOptions, createCheckoutSessionOptionsSchema} from "@/src/application/services/payments/payment.service.interface";
import {InputParseError} from "@/src/entities/errors/common";

export type ICreateCheckoutSessionController = ReturnType<typeof createCheckoutSessionController>;

export const createCheckoutSessionController = (
    createCheckoutSessionUseCase: ICreateCheckoutSessionUseCase
) => async (opts: Partial<CreateCheckoutSessionOptions>) => {

    const {data: parsedOptions, error} = createCheckoutSessionOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError("Invalid options!");

    return createCheckoutSessionUseCase(parsedOptions);
}