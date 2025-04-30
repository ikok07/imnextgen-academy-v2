import { IPaymentService } from "@/src/application/services/payments/payment.service.interface"
import { IGetProductUseCase } from "@/src/application/use-cases/payments/get-product.use-case"
import { ICreateCheckoutSessionController } from "@/src/interface-adapters/controllers/payments/create-checkout-session.controller"
import { IGetProductController } from "@/src/interface-adapters/controllers/payments/get-product.controller"
import {ICreateCheckoutSessionUseCase} from "@/src/application/use-cases/payments/create-checkout-session.use-case";
import {IValidateWebhookUseCase} from "@/src/application/use-cases/payments/validate-webhook.use-case";
import {IValidateWebhookController} from "@/src/interface-adapters/controllers/payments/validate-webhook.controller";
import {IGetCustomerController} from "@/src/interface-adapters/controllers/payments/get-customer.controller";
import {IGetCustomerUseCase} from "@/src/application/use-cases/payments/get-customer.use-case";
import {IGetSubscriptionUseCase} from "@/src/application/use-cases/payments/get-subscription.use-case";
import { IGetSubscriptionController } from "@/src/interface-adapters/controllers/payments/get-subscription.controller";

export const PAYMENTS_SYMBOLS = {
    IPaymentService: Symbol.for("IPaymentService"),

    IGetProductUseCase: Symbol.for("IGetProductUseCase"),
    IGetProductController: Symbol.for("IGetProductController"),

    IGetSubscriptionUseCase: Symbol.for("IGetSubscriptionUseCase"),
    IGetSubscriptionController: Symbol.for("IGetSubscriptionController"),

    IGetCustomerUseCase: Symbol.for("IGetCustomerUseCase"),
    IGetCustomerController: Symbol.for("IGetCustomerController"),

    ICreateCheckoutSessionUseCase: Symbol.for("ICreateCheckoutSessionUseCase"),
    ICreateCheckoutSessionController: Symbol.for("ICreateCheckoutSessionController"),

    IValidateWebhookUseCase: Symbol.for("IValidateWebhookUseCase"),
    IValidateWebhookController: Symbol.for("IValidateWebhookController")
}

export interface PAYMENTS_RETURN_TYPES {
    IPaymentService: IPaymentService,

    IGetProductUseCase: IGetProductUseCase,
    IGetProductController: IGetProductController,

    IGetSubscriptionUseCase: IGetSubscriptionUseCase,
    IGetSubscriptionController: IGetSubscriptionController,

    IGetCustomerUseCase: IGetCustomerUseCase,
    IGetCustomerController: IGetCustomerController

    ICreateCheckoutSessionUseCase: ICreateCheckoutSessionUseCase,
    ICreateCheckoutSessionController: ICreateCheckoutSessionController,

    IValidateWebhookUseCase: IValidateWebhookUseCase,
    IValidateWebhookController: IValidateWebhookController
}


