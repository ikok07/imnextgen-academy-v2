import {IAuthenticationService} from "@/src/application/services/auth/authentication.service.interface";
import {IProfilesRepository} from "@/src/application/repositories/auth/profiles.repository.interface";
import { DatabaseError } from "@/src/entities/errors/db/database";

export type IGetUserUseCase = ReturnType<typeof getUserUseCase>;

export const getUserUseCase = (
    authenticationService: IAuthenticationService,
    profilesRepository: IProfilesRepository
)=> async (excludeDbProfile?: boolean, dbUserNullOnError?: boolean) => {
    const userObject = await authenticationService.getUser();
    try {
        return {
            ...userObject,
            dbProfile: userObject.user?.id && !excludeDbProfile ? await profilesRepository.getProfileById(userObject.user?.id) : null
        };
    } catch (e) {
        if (e instanceof DatabaseError && dbUserNullOnError) {
            return {
                ...userObject,
                dbProfile: null
            }
        }
        throw e;
    }
}