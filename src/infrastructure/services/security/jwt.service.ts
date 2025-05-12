import {IJwtService} from "@/src/application/services/security/jwt.service.interface";
import * as jwt from "jsonwebtoken"

export class JwtService implements IJwtService {
    generateJWT(data: object, expiresInSeconds: number): string {
        return jwt.sign(data, process.env.KEYS_SECRET!, {expiresIn: expiresInSeconds})
    }
    validateJWT(token: string): jwt.JwtPayload | string {
        return jwt.verify(token, process.env.KEYS_SECRET!);
    }
}