import {IGenerateBackendKeyUseCase} from "@/src/application/use-cases/security/generate-backend-key.use-case";

export type IGenerateBackendKeyController = ReturnType<typeof generateBackendKeyController>;

export const generateBackendKeyController = (
    generateBackendKeyUseCase: IGenerateBackendKeyUseCase
) => async () => {
    return generateBackendKeyUseCase();
}