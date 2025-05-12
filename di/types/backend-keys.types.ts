import { IValidateBackendKeyController } from "@/src/interface-adapters/controllers/security/validate-backend-key.controller"
import {IValidateBackendKeyUseCase} from "@/src/application/use-cases/security/validate-backend-key.use-case";
import { IGenerateBackendKeyController } from "@/src/interface-adapters/controllers/security/generate-backend-key.controller";
import {IGenerateBackendKeyUseCase} from "@/src/application/use-cases/security/generate-backend-key.use-case";
import {IBackendKeysRepository} from "@/src/application/repositories/security/backend-keys.repository.interface";

export const BACKEND_KEYS_SYMBOLS = {
    IBackendKeysRepository: Symbol.for("IBackendKeysRepository"),

    IGenerateBackendKeyUseCase: Symbol.for("IGenerateBackendKeyUseCase"),
    IGenerateBackendKeyController: Symbol.for("IGenerateBackendKeyController"),

    IValidateBackendKeyUseCase: Symbol.for("IValidateBackendKeyUseCase"),
    IValidateBackendKeyController: Symbol.for("IValidateBackendKeyController"),
}

export interface BACKEND_KEYS_RETURN_TYPES {
    IBackendKeysRepository: IBackendKeysRepository,

    IGenerateBackendKeyUseCase: IGenerateBackendKeyUseCase,
    IGenerateBackendKeyController: IGenerateBackendKeyController

    IValidateBackendKeyUseCase: IValidateBackendKeyUseCase,
    IValidateBackendKeyController: IValidateBackendKeyController
}


