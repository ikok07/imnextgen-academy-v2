import {IAuthenticationService} from "@/src/application/services/auth/authentication.service.interface";
import {IProfilesRepository} from "@/src/application/repositories/auth/profiles.repository.interface";

export type IGetUserUseCase = ReturnType<typeof getUserUseCase>;

export const getUserUseCase = (
    authenticationService: IAuthenticationService,
    profilesRepository: IProfilesRepository
)=> async (excludeDbProfile?: boolean) => {
    const userObject = await authenticationService.getUser();

    return {
        ...userObject,
        dbProfile: userObject.user?.id && !excludeDbProfile ? await profilesRepository.getProfileById(userObject.user?.id) : null
    };
}