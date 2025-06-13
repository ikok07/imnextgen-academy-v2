import {ProfilesRepository} from "@/src/infrastructure/repositories/auth/profiles.repository";
import {FullProfile} from "@/src/entities/models/auth/full-profile";

export type IGetProfileByCustomerIdUseCase = ReturnType<typeof getProfileByCustomerIdUseCase>;

export const getProfileByCustomerIdUseCase = (
    profilesRepository: ProfilesRepository
) => async (customerId: string) => {
    const rawResponse = await profilesRepository.getProfileByCustomerId(customerId);

    const fullProfile: FullProfile = {
        ...rawResponse[0].profile,
        roles: []
    };

    rawResponse.forEach(response => {
        fullProfile!.roles.push(response.role.type);
    });

    return fullProfile;
}