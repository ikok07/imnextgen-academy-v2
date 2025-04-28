import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {StripeService} from "@/src/infrastructure/services/payments/stripe.service";
import {getProductUseCase} from "@/src/application/use-cases/payments/get-product.use-case";
import {getProductController} from "@/src/interface-adapters/controllers/payments/get-product.controller";

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

    return paymentsModule;
}