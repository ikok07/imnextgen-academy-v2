import {IGenerateJwtUseCase} from "@/src/application/use-cases/security/generate-jwt.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGenerateJwtController = ReturnType<typeof generateJwtController>;

export const generateJwtController = (
    generateJwtUseCase: IGenerateJwtUseCase
) => (data: object, expiresInSeconds: number) => {

    if (expiresInSeconds <= 0) throw new InputParseError("JWT token's expiration seconds must be greater than 0");

    return generateJwtUseCase(data, expiresInSeconds)
}