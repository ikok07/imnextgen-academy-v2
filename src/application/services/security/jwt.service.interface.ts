import * as jwt from "jsonwebtoken"

export interface IJwtService {
    generateJWT(data: object, expiresInSeconds: number): string;
    validateJWT(token: string): jwt.JwtPayload | string
}