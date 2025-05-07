import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {IProfilesRepository} from "@/src/application/repositories/auth/profiles.repository.interface";
import {Profile, ProfileInsert, profilesTable} from "@/drizzle/schema/profiles";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {eq} from "drizzle-orm";

export class ProfilesRepository extends BaseRepository implements IProfilesRepository {
    async getProfileById(id: string): Promise<Profile> {
        try {
            const result = await this.queryDB(async (db) => {
                return db.query.profilesTable.findFirst({where: eq(profilesTable.id, id)});
            });
            if (!result) throw new Error("Could not find profile with this ID!");

            return result;
        } catch(e) {
            throw new DatabaseError(`Failed to get profile: ${e}`);
        }
    }
    async getProfileByEmail(email: string): Promise<Profile> {
        try {
            return this.queryDB(async db => {
                const result = await db.query.profilesTable.findFirst({where: eq(profilesTable.email, email)});
                if (!result) throw new Error("Could not find profile with this email address!");
                return result;
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get profile by email: ${e}`);
        }
    }
    async createProfile(data: ProfileInsert): Promise<Profile> {
        try {
            return this.queryDB(async (db) => {
                return (await db.insert(profilesTable).values(data).returning().execute())[0];
            });
        } catch(e) {
            throw new DatabaseError(`Failed to create profile: ${e}`);
        }
    }

    async updateProfile(userId: string, data: Partial<ProfileInsert>): Promise<Profile> {
        try {
            return this.queryDB(async db => {
                const result = await db.update(profilesTable).set(data).where(eq(profilesTable.id, userId)).returning();
                if (result.length === 0) throw new Error("No profile has been updated!");
                return result[0];
            })
        } catch(e) {
            throw new DatabaseError(`Failed to update profile: ${e}`);
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