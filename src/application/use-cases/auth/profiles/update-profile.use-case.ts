import {ProfilesRepository} from "@/src/infrastructure/repositories/auth/profiles.repository";
import {ProfileInsert} from "@/drizzle/schema/profiles";
import {UpdateProfileOptions} from "@/src/application/repositories/auth/profiles.repository.interface";

export type IUpdateProfileUseCase = ReturnType<typeof updateProfileUseCase>;

export const updateProfileUseCase = (
    profilesRepository: ProfilesRepository
) => async (opts: UpdateProfileOptions) => {
    return profilesRepository.updateProfile(opts);
}