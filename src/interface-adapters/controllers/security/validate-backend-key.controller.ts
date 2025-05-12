import {IValidateBackendKeyUseCase} from "@/src/application/use-cases/security/validate-backend-key.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IValidateBackendKeyController = ReturnType<typeof validateBackendKeyController>;

export const validateBackendKeyController = (
    validateBackendKeyUseCase: IValidateBackendKeyUseCase
) => (value: string | undefined) => {

    if (!value) throw new InputParseError("Invalid value!");

    return validateBackendKeyUseCase(value);
}