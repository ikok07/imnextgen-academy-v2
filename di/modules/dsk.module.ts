import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {DskService} from "@/src/infrastructure/services/payments/dsk.service";
import {
    getCalculationForAllSchemesUseCase
} from "@/src/application/use-cases/payments/dsk/get-calculation-for-all-schemes.use-case";
import {
    getCalculationForAllSchemesController
} from "@/src/interface-adapters/controllers/payments/dsk/get-calculation-for-all-schemes.controller";

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

    return dskModule;
}