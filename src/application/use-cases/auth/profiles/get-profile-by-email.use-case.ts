import {IProfilesRepository} from "@/src/application/repositories/auth/profiles.repository.interface";
import {FullProfile} from "@/src/entities/models/auth/full-profile";

export type IGetProfileByEmailUseCase = ReturnType<typeof getProfileByEmailUseCase>;

export const getProfileByEmailUseCase = (
    profilesRepository: IProfilesRepository
) => async (email: string): Promise<FullProfile> => {
    const rawProfilesResponse = await profilesRepository.getProfileByEmail(email);

    const fullProfile: FullProfile = {
        ...rawProfilesResponse[0].profile,
        roles: []
    };

    rawProfilesResponse.forEach(response => {
        fullProfile.roles.push(response.role.type);
    });

    return fullProfile;
}