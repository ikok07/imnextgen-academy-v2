import {IAuthenticationService} from "@/src/application/services/auth/authentication.service.interface";
import { IDeleteUserUseCase } from "@/src/application/use-cases/auth/delete-user.use-case";
import {IGetUserUseCase} from "@/src/application/use-cases/auth/get-user.use-case";
import {IGetUserController} from "@/src/interface-adapters/controllers/auth/get-user.controller";
import {
    IDeleteMultipleUsersController
} from "@/src/interface-adapters/controllers/auth/delete-multiple-users.controller";
import { IDeleteUserController } from "@/src/interface-adapters/controllers/auth/delete-user.controller";

export const AUTH_SYMBOLS = {
    IAuthenticationService: Symbol.for("IAuthenticationService"),

    IGetUserUseCase: Symbol.for("IGetUserUseCase"),
    IDeleteUserUseCase: Symbol.for("IDeleteUserUseCase"),

    IGetUserController: Symbol.for("IGetUserController"),
    IDeleteUserController: Symbol.for("IDeleteUserController"),
    IDeleteMultipleUsersController: Symbol.for("IDeleteMultipleUsersController"),
}

export interface AUTH_RETURN_TYPES {
    IAuthenticationService: IAuthenticationService,

    IGetUserUseCase: IGetUserUseCase,
    IDeleteUserUseCase: IDeleteUserUseCase,

    IGetUserController: IGetUserController,
    IDeleteUserController: IDeleteUserController,
    IDeleteMultipleUsersController: IDeleteMultipleUsersController
}