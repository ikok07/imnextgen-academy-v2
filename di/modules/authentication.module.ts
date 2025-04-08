import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {ClerkService} from "@/src/infrastructure/services/auth/clerk.service";
import {getUserUseCase} from "@/src/application/use-cases/auth/get-user.use-case";
import {getUserController} from "@/src/interface-adapters/controllers/auth/get-user.controller";

export function createAuthenticationModule() {
    const authModule = createModule();

    authModule
        .bind(DI_SYMBOLS.IAuthenticationService)
        .toClass(ClerkService);

    authModule
        .bind(DI_SYMBOLS.IGetUserUseCase)
        .toHigherOrderFunction(getUserUseCase, [DI_SYMBOLS.IAuthenticationService]);

    authModule
        .bind(DI_SYMBOLS.IGetUserController)
        .toHigherOrderFunction(getUserController, [DI_SYMBOLS.IGetUserUseCase]);

    return authModule;
}