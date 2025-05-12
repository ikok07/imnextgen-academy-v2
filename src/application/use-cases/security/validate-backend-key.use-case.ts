import {IBackendKeysRepository} from "@/src/application/repositories/security/backend-keys.repository.interface";

export type IValidateBackendKeyUseCase = ReturnType<typeof validateBackendKeyUseCase>;

export const validateBackendKeyUseCase = (
    backendKeysRepository: IBackendKeysRepository
) => async (value: string) => {
    return backendKeysRepository.validateBackendKey(value);
}