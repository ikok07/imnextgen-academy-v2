import {IJwtService} from "@/src/application/services/security/jwt.service.interface";

export type IValidateJwtUseCase = ReturnType<typeof validateJwtUseCase>;

export const validateJwtUseCase = (
    jwtService: IJwtService
) => (token: string) => {
    return jwtService.validateJWT(token)
}