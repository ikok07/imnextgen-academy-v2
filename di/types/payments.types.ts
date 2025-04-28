import { IPaymentService } from "@/src/application/services/payments/payment.service.interface"
import { IGetProductUseCase } from "@/src/application/use-cases/payments/get-product.use-case"
import { IGetProductController } from "@/src/interface-adapters/controllers/payments/get-product.controller"

export const PAYMENTS_SYMBOLS = {
    IPaymentService: Symbol.for("IPaymentService"),

    IGetProductUseCase: Symbol.for("IGetProductUseCase"),
    IGetProductController: Symbol.for("IGetProductController")
}

export interface PAYMENTS_RETURN_TYPES {
    IPaymentService: IPaymentService,

    IGetProductUseCase: IGetProductUseCase,
    IGetProductController: IGetProductController
}


