import {IDskService} from "@/src/application/services/payments/dsk.service.interface";
import {
    IGetCalculationForAllSchemesUseCase
} from "@/src/application/use-cases/payments/dsk/get-calculation-for-all-schemes.use-case";
import {
    IGetCalculationForAllSchemesController
} from "@/src/interface-adapters/controllers/payments/dsk/get-calculation-for-all-schemes.controller";

export const DSK_SYMBOLS = {
    IDskService: Symbol.for("IDskService"),

    IGetCalculationForAllSchemesUseCase: Symbol.for("IGetCalculationForAllSchemesUseCase"),
    IGetCalculationForAllSchemesController: Symbol.for("IGetCalculationForAllSchemesController"),
}

export interface DSK_RETURN_TYPES {
    IDskService: IDskService,

    IGetCalculationForAllSchemesUseCase: IGetCalculationForAllSchemesUseCase,
    IGetCalculationForAllSchemesController: IGetCalculationForAllSchemesController
}


