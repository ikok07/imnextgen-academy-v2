import {createModule} from "@evyweb/ioctopus";
import {ProfilesRepository} from "@/src/infrastructure/repositories/auth/profiles.repository";
import {DI_SYMBOLS} from "@/di/types/types";
import {createProfileUseCase} from "@/src/application/use-cases/auth/create-profile.use-case";
import {createProfileController} from "@/src/interface-adapters/controllers/auth/create-profile.controller";
import {deleteProfileUseCase} from "@/src/application/use-cases/auth/delete-profile.use-case";
import {deleteProfileController} from "@/src/interface-adapters/controllers/auth/delete-profile.controller";
import {getProfileUseCase} from "@/src/application/use-cases/auth/get-profile.use-case";
import {getProfileController} from "@/src/interface-adapters/controllers/auth/get-profile.controller";
import {getProfileByEmailUseCase} from "@/src/application/use-cases/auth/get-profile-by-email.use-case";
import { getProfileByEmailController } from "@/src/interface-adapters/controllers/auth/get-profile-by-email.controller";

export function createProfilesModule() {
    const profilesModule = createModule();

    profilesModule
        .bind(DI_SYMBOLS.ProfilesRepository)
        .toClass(ProfilesRepository);

    profilesModule
        .bind(DI_SYMBOLS.IGetProfileUseCase)
        .toHigherOrderFunction(getProfileUseCase, [DI_SYMBOLS.ProfilesRepository]);

    profilesModule
        .bind(DI_SYMBOLS.IGetProfileController)
        .toHigherOrderFunction(getProfileController, [DI_SYMBOLS.IGetProfileUseCase]);

    profilesModule
        .bind(DI_SYMBOLS.IGetProfileByEmailUseCase)
        .toHigherOrderFunction(getProfileByEmailUseCase, [DI_SYMBOLS.ProfilesRepository]);

    profilesModule
        .bind(DI_SYMBOLS.IGetProfileByEmailController)
        .toHigherOrderFunction(getProfileByEmailController, [DI_SYMBOLS.IGetProfileByEmailUseCase]);

    profilesModule
        .bind(DI_SYMBOLS.ICreateProfileUseCase)
        .toHigherOrderFunction(createProfileUseCase, [DI_SYMBOLS.ProfilesRepository]);

    profilesModule
        .bind(DI_SYMBOLS.ICreateProfileController)
        .toHigherOrderFunction(createProfileController, [DI_SYMBOLS.ICreateProfileUseCase]);

    profilesModule
        .bind(DI_SYMBOLS.IDeleteProfileUseCase)
        .toHigherOrderFunction(deleteProfileUseCase, [DI_SYMBOLS.ProfilesRepository]);

    profilesModule
        .bind(DI_SYMBOLS.IDeleteProfileController)
        .toHigherOrderFunction(deleteProfileController, [DI_SYMBOLS.IDeleteProfileUseCase]);

    return profilesModule;
}