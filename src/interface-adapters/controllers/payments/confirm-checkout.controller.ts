import {IConfirmCheckoutUseCase} from "@/src/application/use-cases/payments/confirm-checkout.use-case";
import {InputParseError} from "@/src/entities/errors/common";
import {ConfirmCheckout} from "@/src/application/services/payments/payment.service.interface";

export type IConfirmCheckoutController = ReturnType<typeof confirmCheckoutController>;

export const confirmCheckoutController = (
    confirmCheckoutUseCase: IConfirmCheckoutUseCase
) => async (customerEmail: string | undefined, checkout: ConfirmCheckout) => {
    if (!customerEmail) throw new InputParseError("Invalid customerEmail!");

    return confirmCheckoutUseCase(customerEmail, checkout);
}