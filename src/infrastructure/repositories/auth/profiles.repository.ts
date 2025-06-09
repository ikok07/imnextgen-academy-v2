import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {
    GetAllProfilesOptions,
    IProfilesRepository, RawProfileResponse,
    UpdateProfileOptions
} from "@/src/application/repositories/auth/profiles.repository.interface";
import {Profile, ProfileInsert, profilesTable} from "@/drizzle/schema/profiles";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {eq} from "drizzle-orm";
import {userRolesTable, UserRoleType} from "@/drizzle/schema/user_roles";

export class ProfilesRepository extends BaseRepository implements IProfilesRepository {
    async getProfileById(id: string): Promise<RawProfileResponse> {
        try {
            const result = await this.queryDB(async (db) => {
                return db
                    .select({
                        profile: profilesTable,
                        role: userRolesTable
                    })
                    .from(profilesTable)
                    .where(eq(profilesTable.id, id))
                    .innerJoin(userRolesTable, eq(userRolesTable.profile_id, profilesTable.id));
            });
            if (result.length === 0 || !result[0].profile) throw new Error("Could not find profile with this ID!");

            return result;
        } catch(e) {
            throw new DatabaseError(`Failed to get profile: ${e}`);
        }
    }
    async getProfileByEmail(email: string): Promise<RawProfileResponse> {
        try {
            return this.queryDB(async db => {
                const result = await db
                    .select({
                        profile: profilesTable,
                        role: userRolesTable
                    })
                    .from(profilesTable)
                    .where(eq(profilesTable.email, email))
                    .innerJoin(userRolesTable, eq(userRolesTable.profile_id, profilesTable.id));
                if (result.length === 0 || !result[0].profile) throw new Error("Could not find profile with this email address!");
                return result;
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get profile by email: ${e}`);
        }
    }

    getAllProfiles({limit, offset}: GetAllProfilesOptions): Promise<RawProfileResponse> {
        try {
            return this.queryDB(async db => {
                const baseQuery = db
                    .select({
                        profile: profilesTable,
                        role: userRolesTable
                    })
                    .from(profilesTable)
                    .innerJoin(userRolesTable, eq(userRolesTable.profile_id, profilesTable.id))
                    .$dynamic();

                if (limit) baseQuery.limit(limit);
                if (offset) baseQuery.offset(offset);

                return baseQuery;
            });
        } catch(e) {
            throw new DatabaseError(`Failed to get all profiles: ${e}`);
        }
    }

    getAllProfilesForRole(role: UserRoleType): Promise<RawProfileResponse> {
        try {
            return this.queryDB(db => {
                return db
                    .select({
                        profile: profilesTable,
                        role: userRolesTable
                    })
                    .from(profilesTable)
                    .innerJoin(userRolesTable, eq(userRolesTable.profile_id, profilesTable.id))
                    .where(eq(userRolesTable.type, role))
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get all profiles for roles: ${e}`);
        }
    }

    async createProfile(data: ProfileInsert): Promise<Profile> {
        try {
            return this.queryDB(async (db) => {
                const result = (await db.insert(profilesTable).values(data).returning().execute())[0];
                await db.insert(userRolesTable).values({type: "user", profile_id: result.id});
                return result;
            });
        } catch(e) {
            throw new DatabaseError(`Failed to create profile: ${e}`);
        }
    }

    async updateProfile({data, ...opts}: UpdateProfileOptions): Promise<Profile> {
        try {
            return this.queryDB(async db => {
                const result = await db
                    .update(profilesTable)
                    .set(data)
                    .where(opts.userId ? eq(profilesTable.id, opts.userId) : eq(profilesTable.email, opts.email!))
                    .returning();
                if (result.length === 0) throw new Error("No profile has been updated!");
                return result[0];
            });
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