import {Profile} from "@/drizzle/schema/profiles";

export interface IProfilesRepository {
    createProfile(data: Profile): Promise<Profile>
    deleteProfileById(id: string): Promise<void>
}