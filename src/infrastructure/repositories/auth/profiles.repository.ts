import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {IProfilesRepository} from "@/src/application/repositories/profiles.repository.interface";
import {Profile, ProfileInsert, profilesTable} from "@/drizzle/schema/profiles";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {eq} from "drizzle-orm";

export class ProfilesRepository extends BaseRepository implements IProfilesRepository {
    async createProfile(data: ProfileInsert): Promise<Profile> {
        try {
            return this.queryDB(async (db) => {
                return (await db.insert(profilesTable).values(data).returning().execute())[0];
            });
        } catch(e) {
            throw new DatabaseError(`Failed to create profile: ${e}`);
        }
    }

    async deleteProfileById(id: string): Promise<void> {
        try {
            return this.queryDB(async (db) => {
                await db.delete(profilesTable).where(eq(profilesTable.id, id)).execute();
            });
        } catch(e) {
            throw new DatabaseError(`Failed to delete profile: ${e}`);
        }
    }
}