import {IDskService} from "@/src/application/services/payments/dsk.service.interface";
import {
    IGetCalculationForAllSchemesUseCase
} from "@/src/application/use-cases/payments/dsk/get-calculation-for-all-schemes.use-case";
import {
    IGetCalculationForAllSchemesController
} from "@/src/interface-adapters/controllers/payments/dsk/get-calculation-for-all-schemes.controller";
import {IPayDirectUseCase} from "@/src/application/use-cases/payments/dsk/pay-direct.use-case";
import {IPayDirectController} from "@/src/interface-adapters/controllers/payments/dsk/pay-direct.controller";
import {IGetPaymentStatusUseCase} from "@/src/application/use-cases/payments/dsk/get-payment-status.use-case";
import { IGetPaymentStatusController } from "@/src/interface-adapters/controllers/payments/dsk/get-payment-status.controller";

export const DSK_SYMBOLS = {
    IDskService: Symbol.for("IDskService"),

    IGetCalculationForAllSchemesUseCase: Symbol.for("IGetCalculationForAllSchemesUseCase"),
    IGetCalculationForAllSchemesController: Symbol.for("IGetCalculationForAllSchemesController"),

    IGetPaymentStatusUseCase: Symbol.for("IGetPaymentStatusUseCase"),
    IGetPaymentStatusController: Symbol.for("IGetPaymentStatusController"),

    IPayDirectUseCase: Symbol.for("IPayDirectUseCase"),
    IPayDirectController: Symbol.for("IPayDirectController")
}

export interface DSK_RETURN_TYPES {
    IDskService: IDskService,

    IGetCalculationForAllSchemesUseCase: IGetCalculationForAllSchemesUseCase,
    IGetCalculationForAllSchemesController: IGetCalculationForAllSchemesController,

    IGetPaymentStatusUseCase: IGetPaymentStatusUseCase,
    IGetPaymentStatusController: IGetPaymentStatusController,

    IPayDirectUseCase: IPayDirectUseCase,
    IPayDirectController: IPayDirectController
}


