import {IJwtService} from "@/src/application/services/security/jwt.service.interface";

export type IGenerateJwtUseCase = ReturnType<typeof generateJwtUseCase>;

export const generateJwtUseCase = (
    jwtService: IJwtService
) => (data: object, expiresInSeconds: number) => {
    return jwtService.generateJWT(data, expiresInSeconds)
}