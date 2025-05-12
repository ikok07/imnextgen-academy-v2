import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {BackendKeysRepository} from "@/src/infrastructure/repositories/security/backend-keys.repository";
import {generateBackendKeyUseCase} from "@/src/application/use-cases/security/generate-backend-key.use-case";
import {validateBackendKeyUseCase} from "@/src/application/use-cases/security/validate-backend-key.use-case";
import {
    generateBackendKeyController
} from "@/src/interface-adapters/controllers/security/generate-backend-key.controller";
import {
    validateBackendKeyController
} from "@/src/interface-adapters/controllers/security/validate-backend-key.controller";

export function createBackendKeysModule() {
    const backendKeysModule = createModule();

    backendKeysModule
        .bind(DI_SYMBOLS.IBackendKeysRepository)
        .toClass(BackendKeysRepository);

    backendKeysModule
        .bind(DI_SYMBOLS.IGenerateBackendKeyUseCase)
        .toHigherOrderFunction(generateBackendKeyUseCase, [DI_SYMBOLS.IBackendKeysRepository]);

    backendKeysModule
        .bind(DI_SYMBOLS.IGenerateBackendKeyController)
        .toHigherOrderFunction(generateBackendKeyController, [DI_SYMBOLS.IGenerateBackendKeyUseCase]);

    backendKeysModule
        .bind(DI_SYMBOLS.IValidateBackendKeyUseCase)
        .toHigherOrderFunction(validateBackendKeyUseCase, [DI_SYMBOLS.IBackendKeysRepository]);

    backendKeysModule
        .bind(DI_SYMBOLS.IValidateBackendKeyController)
        .toHigherOrderFunction(validateBackendKeyController, [DI_SYMBOLS.IValidateBackendKeyUseCase]);

    return backendKeysModule;
}