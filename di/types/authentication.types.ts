import {IAuthenticationService} from "@/src/application/services/auth/authentication.service.interface";
import { IGetAllUsersForRoleUseCase } from "@/src/application/use-cases/auth/get-all-users-for-role.use-case";
import {IGetUserUseCase} from "@/src/application/use-cases/auth/get-user.use-case";
import { IGetAllUsersForRoleController } from "@/src/interface-adapters/controllers/auth/get-all-users-for-role.controller";
import {IGetUserController} from "@/src/interface-adapters/controllers/auth/get-user.controller";

export const AUTH_SYMBOLS = {
    IAuthenticationService: Symbol.for("IAuthenticationService"),

    IGetUserUseCase: Symbol.for("IGetUserUseCase"),
    IGetAllUsersForRoleUseCase: Symbol.for("IGetAllUsersForRoleUseCase"),

    IGetUserController: Symbol.for("IGetUserController"),
    IGetAllUsersForRoleController: Symbol.for("IGetAllUsersForRoleController")
}

export interface AUTH_RETURN_TYPES {
    IAuthenticationService: IAuthenticationService,

    IGetUserUseCase: IGetUserUseCase,
    IGetAllUsersForRoleUseCase: IGetAllUsersForRoleUseCase,

    IGetUserController: IGetUserController,
    IGetAllUsersForRoleController: IGetAllUsersForRoleController
}