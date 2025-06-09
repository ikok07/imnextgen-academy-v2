import {IProfilesRepository} from "@/src/application/repositories/auth/profiles.repository.interface";
import {ProfileInsert} from "@/drizzle/schema/profiles";

export type ICreateProfileUseCase = ReturnType<typeof createProfileUseCase>;

export const createProfileUseCase = (
    profilesRepository: IProfilesRepository
) => async (data: ProfileInsert) => {
    return profilesRepository.createProfile(data);
}