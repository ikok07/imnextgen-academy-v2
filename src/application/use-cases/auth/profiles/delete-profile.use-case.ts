import {ProfilesRepository} from "@/src/infrastructure/repositories/auth/profiles.repository";

export type IDeleteProfileUseCase = ReturnType<typeof deleteProfileUseCase>;

export const deleteProfileUseCase = (
    profilesRepository: ProfilesRepository
)=> async (id: string) => {
    return profilesRepository.deleteProfileById(id);
}