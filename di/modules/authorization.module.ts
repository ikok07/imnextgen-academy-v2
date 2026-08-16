import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {LocalAuthorizationService} from "@/src/infrastructure/services/auth/local-authorization.service";
import {checkAccessUseCase} from "@/src/application/use-cases/auth/check-access.use-case";
import {checkAccessController} from "@/src/interface-adapters/controllers/auth/check-access.controller";
import {
    checkResourcesAccessController
} from "@/src/interface-adapters/controllers/auth/check-resources-access.controller";
import {checkResourcesAccessUseCase} from "@/src/application/use-cases/auth/check-resources-access.use-case";

export function createAuthorizationModule() {
    const authorizationModule = createModule();

    authorizationModule
        .bind(DI_SYMBOLS.IAuthorizationService)
        .toClass(LocalAuthorizationService)

    authorizationModule
        .bind(DI_SYMBOLS.ICheckAccessUseCase)
        .toHigherOrderFunction(checkAccessUseCase, [DI_SYMBOLS.IAuthorizationService]);

    authorizationModule
        .bind(DI_SYMBOLS.ICheckAccessController)
        .toHigherOrderFunction(checkAccessController, [DI_SYMBOLS.ICheckAccessUseCase]);

    authorizationModule
        .bind(DI_SYMBOLS.ICheckResourcesAccessUseCase)
        .toHigherOrderFunction(checkResourcesAccessUseCase, [DI_SYMBOLS.IAuthorizationService]);

    authorizationModule
        .bind(DI_SYMBOLS.ICheckResourcesAccessController)
        .toHigherOrderFunction(checkResourcesAccessController, [DI_SYMBOLS.ICheckResourcesAccessUseCase]);

    return authorizationModule;
}