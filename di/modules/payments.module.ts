import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {StripeService} from "@/src/infrastructure/services/payments/stripe.service";
import {getProductUseCase} from "@/src/application/use-cases/payments/get-product.use-case";
import {getProductController} from "@/src/interface-adapters/controllers/payments/get-product.controller";
import {createCheckoutSessionUseCase} from "@/src/application/use-cases/payments/create-checkout-session.use-case";
import {
    createCheckoutSessionController
} from "@/src/interface-adapters/controllers/payments/create-checkout-session.controller";

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
        .bind(DI_SYMBOLS.ICreateCheckoutSessionUseCase)
        .toHigherOrderFunction(createCheckoutSessionUseCase, [DI_SYMBOLS.IPaymentService]);

    paymentsModule
        .bind(DI_SYMBOLS.ICreateCheckoutSessionController)
        .toHigherOrderFunction(createCheckoutSessionController, [DI_SYMBOLS.ICreateCheckoutSessionUseCase]);

    return paymentsModule;
}