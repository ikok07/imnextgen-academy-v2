import {IValidateJwtUseCase} from "@/src/application/use-cases/security/validate-jwt.use-case";

export type IValidateJwtController = ReturnType<typeof validateJwtController>;

export const validateJwtController = (
    validateJwtUseCase: IValidateJwtUseCase
) => (token: string) => {
    return validateJwtUseCase(token);
}