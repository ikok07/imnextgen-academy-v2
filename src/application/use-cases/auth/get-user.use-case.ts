import {IAuthenticationService} from "@/src/application/services/auth/authentication.service.interface";
import {IProfilesRepository} from "@/src/application/repositories/auth/profiles.repository.interface";
import {FullProfile} from "@/src/entities/models/auth/full-profile";

export type IGetUserUseCase = ReturnType<typeof getUserUseCase>;

export const getUserUseCase = (
    authenticationService: IAuthenticationService,
    profilesRepository: IProfilesRepository
)=> async (excludeDbProfile?: boolean, dbUserNullOnError?: boolean) => {
    const userObject = await authenticationService.getUser();

    let fullProfile: FullProfile | null = null;
    if (userObject.user?.id && !excludeDbProfile) {
        try {
            const rawResponse = await profilesRepository.getProfileById(userObject.user?.id);
            fullProfile = {
                ...rawResponse[0].profile,
                roles: []
            };

            rawResponse.forEach(response => {
                fullProfile!.roles.push(response.role.type);
            });
        } catch (e) {
            console.error("Profile not found in db!");
            if (!dbUserNullOnError) throw e;
        }
    }

    return {
        ...userObject,
        dbProfile: fullProfile
    };
}