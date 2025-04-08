import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {CerbosService} from "@/src/infrastructure/services/auth/cerbos.service";
import {checkAccessUseCase} from "@/src/application/use-cases/auth/check-access.use-case";
import {checkAccessController} from "@/src/interface-adapters/controllers/auth/check-access.controller";

export function createAuthorizationModule() {
    const authorizationModule = createModule();

    authorizationModule
        .bind(DI_SYMBOLS.IAuthorizationService)
        .toClass(CerbosService)

    authorizationModule
        .bind(DI_SYMBOLS.ICheckAccessUseCase)
        .toHigherOrderFunction(checkAccessUseCase, [DI_SYMBOLS.IAuthorizationService]);

    authorizationModule
        .bind(DI_SYMBOLS.ICheckAccessController)
        .toHigherOrderFunction(checkAccessController, [DI_SYMBOLS.ICheckAccessUseCase]);

    return authorizationModule;
}