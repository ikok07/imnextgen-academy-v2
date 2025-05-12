import {IBackendKeysRepository} from "@/src/application/repositories/security/backend-keys.repository.interface";

export type IGenerateBackendKeyUseCase = ReturnType<typeof generateBackendKeyUseCase>;

export const generateBackendKeyUseCase = (
    backendKeysRepository: IBackendKeysRepository
) => async () => {
    return backendKeysRepository.generateBackendKey();
}