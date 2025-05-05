import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {StripeService} from "@/src/infrastructure/services/payments/stripe.service";
import {getProductUseCase} from "@/src/application/use-cases/payments/get-product.use-case";
import {getProductController} from "@/src/interface-adapters/controllers/payments/get-product.controller";
import {createCheckoutSessionUseCase} from "@/src/application/use-cases/payments/create-checkout-session.use-case";
import {
    createCheckoutSessionController
} from "@/src/interface-adapters/controllers/payments/create-checkout-session.controller";
import {validateWebhookUseCase} from "@/src/application/use-cases/payments/validate-webhook.use-case";
import {validateWebhookController} from "@/src/interface-adapters/controllers/payments/validate-webhook.controller";
import {getCustomerUseCase} from "@/src/application/use-cases/payments/get-customer.use-case";
import {getCustomerController} from "@/src/interface-adapters/controllers/payments/get-customer.controller";
import {getSubscriptionUseCase} from "@/src/application/use-cases/payments/get-subscription.use-case";
import {getSubscriptionController} from "@/src/interface-adapters/controllers/payments/get-subscription.controller";
import {
    getCheckoutSessionsLineItemsUseCase
} from "@/src/application/use-cases/payments/get-checkout-sessions-line-items.use-case";
import {
    getCheckoutSessionsLineItemsController
} from "@/src/interface-adapters/controllers/payments/get-checkout-sessions-line-items.controller";
import {confirmCheckoutUseCase} from "@/src/application/use-cases/payments/confirm-checkout.use-case";
import {confirmCheckoutController} from "@/src/interface-adapters/controllers/payments/confirm-checkout.controller";

export function createPaymentsModule() {
    const paymentsModule = createModule();

    paymentsModule
        .bind(DI_SYMBOLS.IPaymentService)
        .toClass(StripeService);

    paymentsModule
        .bind(DI_SYMBOLS.IGetProductUseCase)
        .toHigherOrderFunction(getProductUseCase, [DI_SYMBOLS.IPaymentService]);

    paymentsModule
        .bind(DI_SYMBOLS.IGetProductController)
        .toHigherOrderFunction(getProductController, [DI_SYMBOLS.IGetProductUseCase]);

    paymentsModule
        .bind(DI_SYMBOLS.IGetSubscriptionUseCase)
        .toHigherOrderFunction(getSubscriptionUseCase, [DI_SYMBOLS.IPaymentService]);

    paymentsModule
        .bind(DI_SYMBOLS.IGetSubscriptionController)
        .toHigherOrderFunction(getSubscriptionController, [DI_SYMBOLS.IGetSubscriptionUseCase]);

    paymentsModule
        .bind(DI_SYMBOLS.ICreateCheckoutSessionUseCase)
        .toHigherOrderFunction(createCheckoutSessionUseCase, [DI_SYMBOLS.IPaymentService]);

    paymentsModule
        .bind(DI_SYMBOLS.ICreateCheckoutSessionController)
        .toHigherOrderFunction(createCheckoutSessionController, [DI_SYMBOLS.ICreateCheckoutSessionUseCase]);

    paymentsModule
        .bind(DI_SYMBOLS.IGetCheckoutSessionsLineItemsUseCase)
        .toHigherOrderFunction(getCheckoutSessionsLineItemsUseCase, [DI_SYMBOLS.IPaymentService]);

    paymentsModule
        .bind(DI_SYMBOLS.IGetCheckoutSessionsLineItemsController)
        .toHigherOrderFunction(getCheckoutSessionsLineItemsController, [DI_SYMBOLS.IGetCheckoutSessionsLineItemsUseCase]);

    paymentsModule
        .bind(DI_SYMBOLS.IConfirmCheckoutUseCase)
        .toHigherOrderFunction(confirmCheckoutUseCase, [DI_SYMBOLS.IPaymentService]);

    paymentsModule
        .bind(DI_SYMBOLS.IConfirmCheckoutController)
        .toHigherOrderFunction(confirmCheckoutController, [DI_SYMBOLS.IConfirmCheckoutUseCase]);

    paymentsModule
        .bind(DI_SYMBOLS.IValidateWebhookUseCase)
        .toHigherOrderFunction(validateWebhookUseCase, [DI_SYMBOLS.IPaymentService]);

    paymentsModule
        .bind(DI_SYMBOLS.IValidateWebhookController)
        .toHigherOrderFunction(validateWebhookController, [DI_SYMBOLS.IValidateWebhookUseCase]);

    paymentsModule
        .bind(DI_SYMBOLS.IGetCustomerUseCase)
        .toHigherOrderFunction(getCustomerUseCase, [DI_SYMBOLS.IPaymentService]);

    paymentsModule
        .bind(DI_SYMBOLS.IGetCustomerController)
        .toHigherOrderFunction(getCustomerController, [DI_SYMBOLS.IGetCustomerUseCase]);

    return paymentsModule;
}