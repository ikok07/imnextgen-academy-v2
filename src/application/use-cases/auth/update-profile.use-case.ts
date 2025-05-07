import {ProfilesRepository} from "@/src/infrastructure/repositories/auth/profiles.repository";
import {ProfileInsert} from "@/drizzle/schema/profiles";

export type IUpdateProfileUseCase = ReturnType<typeof updateProfileUseCase>;

export const updateProfileUseCase = (
    profilesRepository: ProfilesRepository
) => async (userId: string, data: Partial<ProfileInsert>) => {
    return profilesRepository.updateProfile(userId, data);
}