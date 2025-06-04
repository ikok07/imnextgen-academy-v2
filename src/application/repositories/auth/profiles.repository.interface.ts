import {Profile, ProfileInsert, profilesInsertSchema} from "@/drizzle/schema/profiles";
import {z} from "zod";
import {FullProfile} from "@/src/entities/models/auth/full-profile";
import {UserRole, UserRoleType} from "@/drizzle/schema/user_roles";

const updateProfileByUserIdOptionsSchema = z.object({
    userId: z.string(),
    email: z.undefined(),
    data: profilesInsertSchema.partial()
});

const updateProfileByEmailIdOptionsSchema = z.object({
    userId: z.undefined(),
    email: z.string().email(),
    data: profilesInsertSchema.partial()
});

export const updateProfileOptionsSchema = updateProfileByUserIdOptionsSchema.or(updateProfileByEmailIdOptionsSchema);

export type UpdateProfileOptions = z.infer<typeof updateProfileOptionsSchema>;

export type RawProfileResponse = {
    profile: Profile,
    role: UserRole
}[];

export interface IProfilesRepository {
    getProfileById(id: string): Promise<RawProfileResponse>
    getProfileByEmail(email: string): Promise<RawProfileResponse>
    getAllProfilesForRole(role: UserRoleType): Promise<RawProfileResponse>
    createProfile(data: ProfileInsert): Promise<Profile>
    updateProfile(opts: UpdateProfileOptions): Promise<Profile>
    deleteProfileById(id: string): Promise<void>
}