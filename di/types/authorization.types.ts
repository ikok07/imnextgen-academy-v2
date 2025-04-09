import {IAuthorizationService} from "@/src/application/services/auth/authorization.service.interface";
import {ICheckAccessUseCase} from "@/src/application/use-cases/auth/check-access.use-case";
import {ICheckAccessController} from "@/src/interface-adapters/controllers/auth/check-access.controller";
import {
    ICheckResourcesAccessController
} from "@/src/interface-adapters/controllers/auth/check-resources-access.controller";
import {ICheckResourcesAccessUseCase} from "@/src/application/use-cases/auth/check-resources-access.use-case";

export const AUTHORIZATION_SYMBOLS = {
    IAuthorizationService: Symbol.for("IAuthorizationService"),

    ICheckAccessUseCase: Symbol.for("ICheckAccessUseCase"),
    ICheckResourcesAccessUseCase: Symbol.for("ICheckResourcesAccessUseCase"),

    ICheckAccessController: Symbol.for("ICheckAccessController"),
    ICheckResourcesAccessController: Symbol.for("ICheckResourcesAccessController")
}

export interface AUTHORIZATION_RETURN_TYPES {
    IAuthorizationService: IAuthorizationService,

    ICheckAccessUseCase: ICheckAccessUseCase,
    ICheckResourcesAccessUseCase: ICheckResourcesAccessUseCase

    ICheckAccessController: ICheckAccessController,
    ICheckResourcesAccessController: ICheckResourcesAccessController
}