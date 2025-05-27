import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {IBackendKeysRepository} from "@/src/application/repositories/security/backend-keys.repository.interface";
import { DatabaseError } from "@/src/entities/errors/db/database";
import crypto from "node:crypto";
import {backendKeysTable} from "@/drizzle/schema/backend_keys";
import {eq} from "drizzle-orm";

export class BackendKeysRepository extends BaseRepository implements IBackendKeysRepository {

    private hashString(str: string): string {
        return crypto.createHmac("sha256", process.env.KEYS_SECRET!).update(str).digest("base64")
    }

    private createKey() {
        const keyLength = 32;
        let key: string = 'key_imnextgen_';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < keyLength; i++ ) {
            key += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return key;
    }

    generateBackendKey(): {key: string, encoded: string} {
        try {
            const key = this.createKey();
            return {
                key,
                encoded: this.hashString(key)
            };
        } catch(e) {
            throw new DatabaseError(`Failed to generate backend key: ${e}`)
        }
    }

    async validateBackendKey(value: string): Promise<boolean> {
        try {
            const hashedValue = this.hashString(value);
            console.log(process.env.KEYS_SECRET)
            const foundKeys = await this.queryDB(db => {
                return db.select().from(backendKeysTable).where(eq(backendKeysTable.encoded_key, hashedValue));
            });
            return foundKeys.length > 0;
        } catch(e) {
            throw new DatabaseError(`Failed to validate backend key: ${e}`)
        }
    }

}