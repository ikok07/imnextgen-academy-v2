import {IAuthenticationService} from "@/src/application/services/auth/authentication.service.interface";
import {IGetUserUseCase} from "@/src/application/use-cases/auth/get-user.use-case";
import {ISendConfirmEmailUseCase} from "@/src/application/use-cases/email/send-confirm-email.use-case";
import {IGetUserController} from "@/src/interface-adapters/controllers/auth/get-user.controller";

export const AUTH_SYMBOLS = {
    IAuthenticationService: Symbol.for("IAuthenticationService"),

    IGetUserUseCase: Symbol.for("IGetUserUseCase"),
    ISendConfirmEmailUseCase: Symbol.for("ISendConfirmEmailUseCase"),

    IGetUserController: Symbol.for("IGetUserController")
}

export interface AUTH_RETURN_TYPES {
    IAuthenticationService: IAuthenticationService,

    IGetUserUseCase: IGetUserUseCase,
    ISendConfirmEmailUseCase: ISendConfirmEmailUseCase,

    IGetUserController: IGetUserController,
}