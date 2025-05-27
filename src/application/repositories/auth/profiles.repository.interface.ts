import {Profile, ProfileInsert, profilesInsertSchema} from "@/drizzle/schema/profiles";
import {z} from "zod";

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

export interface IProfilesRepository {
    getProfileById(id: string): Promise<Profile>
    getProfileByEmail(email: string): Promise<Profile>
    createProfile(data: ProfileInsert): Promise<Profile>
    updateProfile(opts: UpdateProfileOptions): Promise<Profile>
    deleteProfileById(id: string): Promise<void>
}