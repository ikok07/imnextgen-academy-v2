import {
    IGetCheckoutSessionsLineItemsUseCase
} from "@/src/application/use-cases/payments/get-checkout-sessions-line-items.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetCheckoutSessionsLineItemsController = ReturnType<typeof getCheckoutSessionsLineItemsController>;

export const getCheckoutSessionsLineItemsController = (
    getCheckoutSessionsLineItemsUseCase: IGetCheckoutSessionsLineItemsUseCase
) => (sessionId: string) => {

    if (!sessionId) throw new InputParseError("Invalid sessionId!");

    return getCheckoutSessionsLineItemsUseCase(sessionId);
}