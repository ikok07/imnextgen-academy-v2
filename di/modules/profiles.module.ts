import {createModule} from "@evyweb/ioctopus";
import {ProfilesRepository} from "@/src/infrastructure/repositories/auth/profiles.repository";
import {DI_SYMBOLS} from "@/di/types/types";
import {createProfileUseCase} from "@/src/application/use-cases/auth/profiles/create-profile.use-case";
import {createProfileController} from "@/src/interface-adapters/controllers/auth/profiles/create-profile.controller";
import {deleteProfileUseCase} from "@/src/application/use-cases/auth/profiles/delete-profile.use-case";
import {deleteProfileController} from "@/src/interface-adapters/controllers/auth/profiles/delete-profile.controller";
import {getProfileUseCase} from "@/src/application/use-cases/auth/profiles/get-profile.use-case";
import {getProfileController} from "@/src/interface-adapters/controllers/auth/profiles/get-profile.controller";
import {getProfileByEmailUseCase} from "@/src/application/use-cases/auth/profiles/get-profile-by-email.use-case";
import { getProfileByEmailController } from "@/src/interface-adapters/controllers/auth/profiles/get-profile-by-email.controller";
import {updateProfileUseCase} from "@/src/application/use-cases/auth/profiles/update-profile.use-case";
import {updateProfileController} from "@/src/interface-adapters/controllers/auth/profiles/update-profile.controller";
import {getAllProfilesForRoleUseCase} from "@/src/application/use-cases/auth/profiles/get-all-profiles-for-role.use-case";
import {
    getAllProfilesForRoleController
} from "@/src/interface-adapters/controllers/auth/profiles/get-all-profiles-for-role.controller";
import {getAllProfilesUseCase} from "@/src/application/use-cases/auth/profiles/get-all-profiles.use-case";
import {getAllProfilesController} from "@/src/interface-adapters/controllers/auth/profiles/get-all-profiles.controller";
import {
    getProfileByCustomerIdUseCase
} from "@/src/application/use-cases/auth/profiles/get-profile-by-customer-id.use-case";
import {
    getProfileByCustomerIdController
} from "@/src/interface-adapters/controllers/auth/profiles/get-profile-by-customer-id.controller";

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
        .bind(DI_SYMBOLS.IGetAllProfilesUseCase)
        .toHigherOrderFunction(getAllProfilesUseCase, [DI_SYMBOLS.ProfilesRepository]);

    profilesModule
        .bind(DI_SYMBOLS.IGetAllProfilesController)
        .toHigherOrderFunction(getAllProfilesController, [DI_SYMBOLS.IGetAllProfilesUseCase, DI_SYMBOLS.IGetUserController, DI_SYMBOLS.ICheckAccessController]);

    profilesModule
        .bind(DI_SYMBOLS.IGetAllProfilesForRoleUseCase)
        .toHigherOrderFunction(getAllProfilesForRoleUseCase, [DI_SYMBOLS.ProfilesRepository]);

    profilesModule
        .bind(DI_SYMBOLS.IGetAllProfilesForRoleController)
        .toHigherOrderFunction(getAllProfilesForRoleController, [DI_SYMBOLS.IGetAllProfilesForRoleUseCase]);

    profilesModule
        .bind(DI_SYMBOLS.IGetProfileByEmailUseCase)
        .toHigherOrderFunction(getProfileByEmailUseCase, [DI_SYMBOLS.ProfilesRepository]);

    profilesModule
        .bind(DI_SYMBOLS.IGetProfileByEmailController)
        .toHigherOrderFunction(getProfileByEmailController, [DI_SYMBOLS.IGetProfileByEmailUseCase]);

    profilesModule
        .bind(DI_SYMBOLS.IGetProfileByCustomerIdUseCase)
        .toHigherOrderFunction(getProfileByCustomerIdUseCase, [DI_SYMBOLS.ProfilesRepository]);

    profilesModule
        .bind(DI_SYMBOLS.IGetProfileByCustomerIdController)
        .toHigherOrderFunction(getProfileByCustomerIdController, [DI_SYMBOLS.IGetProfileByCustomerIdUseCase]);

    profilesModule
        .bind(DI_SYMBOLS.ICreateProfileUseCase)
        .toHigherOrderFunction(createProfileUseCase, [DI_SYMBOLS.ProfilesRepository]);

    profilesModule
        .bind(DI_SYMBOLS.ICreateProfileController)
        .toHigherOrderFunction(createProfileController, [DI_SYMBOLS.ICreateProfileUseCase]);

    profilesModule
        .bind(DI_SYMBOLS.IUpdateProfileUseCase)
        .toHigherOrderFunction(updateProfileUseCase, [DI_SYMBOLS.ProfilesRepository]);

    profilesModule
        .bind(DI_SYMBOLS.IUpdateProfileController)
        .toHigherOrderFunction(updateProfileController, [DI_SYMBOLS.IUpdateProfileUseCase]);

    profilesModule
        .bind(DI_SYMBOLS.IDeleteProfileUseCase)
        .toHigherOrderFunction(deleteProfileUseCase, [DI_SYMBOLS.ProfilesRepository]);

    profilesModule
        .bind(DI_SYMBOLS.IDeleteProfileController)
        .toHigherOrderFunction(deleteProfileController, [DI_SYMBOLS.IDeleteProfileUseCase]);

    return profilesModule;
}