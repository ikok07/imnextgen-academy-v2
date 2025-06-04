import {IProfilesRepository} from "@/src/application/repositories/auth/profiles.repository.interface";
import {FullProfile} from "@/src/entities/models/auth/full-profile";

export type IGetProfileUseCase = ReturnType<typeof getProfileUseCase>;

export const getProfileUseCase = (
    profilesRepository: IProfilesRepository
) => async (userId: string) => {
    const rawResponse = await profilesRepository.getProfileById(userId);

    const fullProfile: FullProfile = {
        ...rawResponse[0].profile,
        roles: []
    };

    rawResponse.forEach(response => {
        fullProfile!.roles.push(response.role.type);
    });

    return fullProfile;
}