import {Profile, ProfileInsert} from "@/drizzle/schema/profiles";

export interface IProfilesRepository {
    getProfileById(id: string): Promise<Profile>
    createProfile(data: ProfileInsert): Promise<Profile>
    deleteProfileById(id: string): Promise<void>
}