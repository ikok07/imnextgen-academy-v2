import {IProfilesRepository} from "@/src/application/repositories/profiles.repository.interface";
import {Profile} from "@/drizzle/schema/profiles";

export type ICreateProfileUseCase = ReturnType<typeof createProfileUseCase>;

export const createProfileUseCase = (
    profilesRepository: IProfilesRepository
) => async (data: Profile) => {
    return profilesRepository.createProfile(data);
}