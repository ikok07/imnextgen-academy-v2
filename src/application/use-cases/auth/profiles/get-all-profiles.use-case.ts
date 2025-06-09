import {
    GetAllProfilesOptions,
    IProfilesRepository
} from "@/src/application/repositories/auth/profiles.repository.interface";
import {FullProfile} from "@/src/entities/models/auth/full-profile";

export type IGetAllProfilesUseCase = ReturnType<typeof getAllProfilesUseCase>;

export const getAllProfilesUseCase = (
    profilesRepository: IProfilesRepository
) => async (opts: GetAllProfilesOptions) => {
    const rawResponse = await profilesRepository.getAllProfiles(opts);

    const fullProfiles = new Map<string, FullProfile>([]);

    rawResponse.forEach(response => {
        if (!fullProfiles.has(response.profile.id)) {
            fullProfiles.set(response.profile.id, {
                ...response.profile,
                roles: []
            })
        }

        const fullProfile = fullProfiles.get(response.profile.id)!;

        fullProfile.roles.push(response.role.type);
    });

    return Array.from(fullProfiles.values());
}