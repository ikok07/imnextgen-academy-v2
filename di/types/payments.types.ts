import { IPaymentService } from "@/src/application/services/payments/payment.service.interface"
import { IGetProductUseCase } from "@/src/application/use-cases/payments/get-product.use-case"
import { ICreateCheckoutSessionController } from "@/src/interface-adapters/controllers/payments/create-checkout-session.controller"
import { IGetProductController } from "@/src/interface-adapters/controllers/payments/get-product.controller"
import {ICreateCheckoutSessionUseCase} from "@/src/application/use-cases/payments/create-checkout-session.use-case";

export const PAYMENTS_SYMBOLS = {
    IPaymentService: Symbol.for("IPaymentService"),

    IGetProductUseCase: Symbol.for("IGetProductUseCase"),
    IGetProductController: Symbol.for("IGetProductController"),

    ICreateCheckoutSessionUseCase: Symbol.for("ICreateCheckoutSessionUseCase"),
    ICreateCheckoutSessionController: Symbol.for("ICreateCheckoutSessionController")
}

export interface PAYMENTS_RETURN_TYPES {
    IPaymentService: IPaymentService,

    IGetProductUseCase: IGetProductUseCase,
    IGetProductController: IGetProductController,

    ICreateCheckoutSessionUseCase: ICreateCheckoutSessionUseCase,
    ICreateCheckoutSessionController: ICreateCheckoutSessionController
}


