import {IAuthorizationService} from "@/src/application/services/auth/authorization.service.interface";
import {ICheckAccessUseCase} from "@/src/application/use-cases/auth/check-access.use-case";
import {ICheckAccessController} from "@/src/interface-adapters/controllers/auth/check-access.controller";

export const AUTHORIZATION_SYMBOLS = {
    IAuthorizationService: Symbol.for("IAuthorizationService"),
    ICheckAccessUseCase: Symbol.for("ICheckAccessUseCase"),
    ICheckAccessController: Symbol.for("ICheckAccessController")
}

export interface AUTHORIZATION_RETURN_TYPES {
    IAuthorizationService: IAuthorizationService,
    ICheckAccessUseCase: ICheckAccessUseCase,
    ICheckAccessController: ICheckAccessController
}