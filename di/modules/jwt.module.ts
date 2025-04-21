import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {JwtService} from "@/src/infrastructure/services/security/jwt.service";
import {generateJwtUseCase} from "@/src/application/use-cases/security/generate-jwt.use-case";
import {validateJwtController} from "@/src/interface-adapters/controllers/security/validate-jwt.controller";
import {validateJwtUseCase} from "@/src/application/use-cases/security/validate-jwt.use-case";
import {generateJwtController} from "@/src/interface-adapters/controllers/security/generate-jwt.controller";

export function createJwtModule() {
    const jwtModule = createModule();

    jwtModule
        .bind(DI_SYMBOLS.IJwtService)
        .toClass(JwtService);

    jwtModule
        .bind(DI_SYMBOLS.IGenerateJwtUseCase)
        .toHigherOrderFunction(generateJwtUseCase, [DI_SYMBOLS.IJwtService]);

    jwtModule
        .bind(DI_SYMBOLS.IGenerateJwtController)
        .toHigherOrderFunction(generateJwtController, [DI_SYMBOLS.IGenerateJwtUseCase]);

    jwtModule
        .bind(DI_SYMBOLS.IValidateJwtUseCase)
        .toHigherOrderFunction(validateJwtUseCase, [DI_SYMBOLS.IJwtService]);

    jwtModule
        .bind(DI_SYMBOLS.IValidateJwtController)
        .toHigherOrderFunction(validateJwtController, [DI_SYMBOLS.IValidateJwtUseCase]);

    return jwtModule;
}