import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {ClerkService} from "@/src/infrastructure/services/auth/clerk.service";
import {getUserUseCase} from "@/src/application/use-cases/auth/get-user.use-case";
import {getUserController} from "@/src/interface-adapters/controllers/auth/get-user.controller";
import {deleteUserUseCase} from "@/src/application/use-cases/auth/delete-user.use-case";
import {deleteUserController} from "@/src/interface-adapters/controllers/auth/delete-user.controller";
import {
    deleteMultipleUsersController
} from "@/src/interface-adapters/controllers/auth/delete-multiple-users.controller";

export function createAuthenticationModule() {
    const authModule = createModule();

    authModule
        .bind(DI_SYMBOLS.IAuthenticationService)
        .toClass(ClerkService);

    authModule
        .bind(DI_SYMBOLS.IGetUserUseCase)
        .toHigherOrderFunction(getUserUseCase, [DI_SYMBOLS.IAuthenticationService, DI_SYMBOLS.ProfilesRepository]);

    authModule
        .bind(DI_SYMBOLS.IGetUserController)
        .toHigherOrderFunction(getUserController, [DI_SYMBOLS.IGetUserUseCase]);

    authModule
        .bind(DI_SYMBOLS.IDeleteUserUseCase)
        .toHigherOrderFunction(deleteUserUseCase, [DI_SYMBOLS.IAuthenticationService]);

    authModule
        .bind(DI_SYMBOLS.IDeleteUserController)
        .toHigherOrderFunction(deleteUserController, [DI_SYMBOLS.IDeleteUserUseCase, DI_SYMBOLS.IGetUserUseCase]);

    authModule
        .bind(DI_SYMBOLS.IDeleteMultipleUsersController)
        .toHigherOrderFunction(deleteMultipleUsersController, [DI_SYMBOLS.IDeleteUserUseCase, DI_SYMBOLS.IGetUserUseCase]);

    return authModule;
}