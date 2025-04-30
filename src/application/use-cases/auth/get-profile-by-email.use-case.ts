import {IProfilesRepository} from "@/src/application/repositories/auth/profiles.repository.interface";

export type IGetProfileByEmailUseCase = ReturnType<typeof getProfileByEmailUseCase>;

export const getProfileByEmailUseCase = (
    profilesRepository: IProfilesRepository
) => async (email: string) => {
    return profilesRepository.getProfileByEmail(email);
}