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

    generateBackendKey(): {key: string, encoded: string} {
        try {
            const key = crypto.randomBytes(32).toString("utf8");
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
            const foundKeys = await this.queryDB(db => {
                return db.select().from(backendKeysTable).where(eq(backendKeysTable.encoded_key, hashedValue));
            });
            return foundKeys.length > 0;
        } catch(e) {
            throw new DatabaseError(`Failed to validate backend key: ${e}`)
        }
    }

}