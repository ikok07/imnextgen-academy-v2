import {IProfilesRepository} from "@/src/application/repositories/auth/profiles.repository.interface";
import {UserRoleType} from "@/drizzle/schema/user_roles";
import {FullProfile} from "@/src/entities/models/auth/full-profile";

export type IGetAllProfilesForRoleUseCase = ReturnType<typeof getAllProfilesForRoleUseCase>;

export const getAllProfilesForRoleUseCase = (
    profilesRepository: IProfilesRepository
) => async (role: UserRoleType) => {
    const rawResponse = await profilesRepository.getAllProfilesForRole(role);

    const fullProfilesMap = new Map<string, FullProfile>([]);

    rawResponse.forEach(response => {
        if (!fullProfilesMap.has(response.profile.id)) {
            fullProfilesMap.set(response.profile.id, {
                ...response.profile,
                roles: []
            })
        }

        const fullProfile = fullProfilesMap.get(response.profile.id)!;

        fullProfile.roles.push(response.role.type);
    });

    return Array.from(fullProfilesMap.values());
}