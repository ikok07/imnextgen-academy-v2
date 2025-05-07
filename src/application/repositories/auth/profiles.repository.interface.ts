import {Profile, ProfileInsert} from "@/drizzle/schema/profiles";

export interface IProfilesRepository {
    getProfileById(id: string): Promise<Profile>
    getProfileByEmail(email: string): Promise<Profile>
    createProfile(data: ProfileInsert): Promise<Profile>
    updateProfile(userId: string, data: Partial<ProfileInsert>): Promise<Profile>
    deleteProfileById(id: string): Promise<void>
}