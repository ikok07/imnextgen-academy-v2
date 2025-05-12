import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {DskService} from "@/src/infrastructure/services/payments/dsk.service";
import {
    getCalculationForAllSchemesUseCase
} from "@/src/application/use-cases/payments/dsk/get-calculation-for-all-schemes.use-case";
import {
    getCalculationForAllSchemesController
} from "@/src/interface-adapters/controllers/payments/dsk/get-calculation-for-all-schemes.controller";
import {payDirectUseCase} from "@/src/application/use-cases/payments/dsk/pay-direct.use-case";
import {payDirectController} from "@/src/interface-adapters/controllers/payments/dsk/pay-direct.controller";

export function createDskModule() {
    const dskModule = createModule();

    dskModule
        .bind(DI_SYMBOLS.IDskService)
        .toClass(DskService)

    dskModule
        .bind(DI_SYMBOLS.IGetCalculationForAllSchemesUseCase)
        .toHigherOrderFunction(getCalculationForAllSchemesUseCase, [DI_SYMBOLS.IDskService]);

    dskModule
        .bind(DI_SYMBOLS.IGetCalculationForAllSchemesController)
        .toHigherOrderFunction(getCalculationForAllSchemesController, [DI_SYMBOLS.IGetCalculationForAllSchemesUseCase, DI_SYMBOLS.IGetProductUseCase]);

    dskModule
        .bind(DI_SYMBOLS.IPayDirectUseCase)
        .toHigherOrderFunction(payDirectUseCase, [DI_SYMBOLS.IDskService]);

    dskModule
        .bind(DI_SYMBOLS.IPayDirectController)
        .toHigherOrderFunction(payDirectController, [DI_SYMBOLS.ICreateOrderUseCase, DI_SYMBOLS.IPayDirectUseCase]);

    return dskModule;
}