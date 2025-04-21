import {IJwtService} from "@/src/application/services/security/jwt.service.interface";
import { IGenerateJwtUseCase } from "@/src/application/use-cases/security/generate-jwt.use-case";
import { IValidateJwtUseCase } from "@/src/application/use-cases/security/validate-jwt.use-case";
import { IGenerateJwtController } from "@/src/interface-adapters/controllers/security/generate-jwt.controller";
import { IValidateJwtController } from "@/src/interface-adapters/controllers/security/validate-jwt.controller";

export const JWT_SYMBOLS = {
    IJwtService: Symbol.for("IJwtService"),

    IGenerateJwtUseCase: Symbol.for("IGenerateJwtUseCase"),
    IGenerateJwtController: Symbol.for("IGenerateJwtController"),

    IValidateJwtUseCase: Symbol.for("IValidateJwtUseCase"),
    IValidateJwtController: Symbol.for("IValidateJwtController"),
}

export interface JWT_RETURN_TYPES {
    IJwtService: IJwtService,

    IGenerateJwtUseCase: IGenerateJwtUseCase,
    IGenerateJwtController: IGenerateJwtController,

    IValidateJwtUseCase: IValidateJwtUseCase,
    IValidateJwtController: IValidateJwtController,
}


