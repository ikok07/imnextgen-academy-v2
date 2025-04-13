import {IProfilesRepository} from "@/src/application/repositories/profiles.repository.interface";

export type IGetProfileUseCase = ReturnType<typeof getProfileUseCase>;

export const getProfileUseCase = (
    profilesRepository: IProfilesRepository
) => async (userId: string) => {
    return profilesRepository.getProfileById(userId);
}