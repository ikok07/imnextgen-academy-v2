import {Profile, ProfileInsert} from "@/drizzle/schema/profiles";

export interface IProfilesRepository {
    createProfile(data: ProfileInsert): Promise<Profile>
    deleteProfileById(id: string): Promise<void>
}