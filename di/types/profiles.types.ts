import {ProfilesRepository} from "@/src/infrastructure/repositories/auth/profiles.repository";
import {ICreateProfileUseCase} from "@/src/application/use-cases/auth/profiles/create-profile.use-case";
import {ICreateProfileController} from "@/src/interface-adapters/controllers/auth/profiles/create-profile.controller";
import {IDeleteProfileUseCase} from "@/src/application/use-cases/auth/profiles/delete-profile.use-case";
import {IDeleteProfileController} from "@/src/interface-adapters/controllers/auth/profiles/delete-profile.controller";
import {IGetProfileUseCase} from "@/src/application/use-cases/auth/profiles/get-profile.use-case";
import {IGetProfileController} from "@/src/interface-adapters/controllers/auth/profiles/get-profile.controller";
import {IGetProfileByEmailController} from "@/src/interface-adapters/controllers/auth/profiles/get-profile-by-email.controller";
import {IGetProfileByEmailUseCase} from "@/src/application/use-cases/auth/profiles/get-profile-by-email.use-case";
import {IUpdateProfileUseCase} from "@/src/application/use-cases/auth/profiles/update-profile.use-case";
import { IUpdateProfileController } from "@/src/interface-adapters/controllers/auth/profiles/update-profile.controller";
import { IGetAllProfilesForRoleUseCase } from "@/src/application/use-cases/auth/profiles/get-all-profiles-for-role.use-case";
import {
    IGetAllProfilesForRoleController
} from "@/src/interface-adapters/controllers/auth/profiles/get-all-profiles-for-role.controller";
import {IGetAllProfilesUseCase} from "@/src/application/use-cases/auth/profiles/get-all-profiles.use-case";
import {
    IGetAllProfilesController
} from "@/src/interface-adapters/controllers/auth/profiles/get-all-profiles.controller";

export const PROFILE_SYMBOLS = {
    ProfilesRepository: Symbol.for("ProfilesRepository"),

    IGetProfileUseCase: Symbol.for("IGetProfileUseCase"),
    IGetProfileByEmailUseCase: Symbol.for("IGetProfileByEmailUseCase"),
    IGetAllProfilesUseCase: Symbol.for("IGetAllProfilesUseCase"),
    IGetAllProfilesController: Symbol.for("IGetAllProfilesController"),
    IGetAllProfilesForRoleUseCase: Symbol.for("IGetAllProfilesForRoleUseCase"),
    IGetAllProfilesForRoleController: Symbol.for("IGetAllProfilesForRoleController"),
    ICreateProfileUseCase: Symbol.for("ICreateProfileUseCase"),
    ICreateProfileController: Symbol.for("ICreateProfileController"),
    IUpdateProfileUseCase: Symbol.for("IUpdateProfileUseCase"),
    IUpdateProfileController: Symbol.for("IUpdateProfileController"),

    IGetProfileController: Symbol.for("IGetProfileController"),
    IGetProfileByEmailController: Symbol.for("IGetProfileByEmailController"),
    IDeleteProfileUseCase: Symbol.for("IDeleteProfileUseCase"),
    IDeleteProfileController: Symbol.for("IDeleteProfileController")
}

export interface PROFILE_RETURN_TYPES {
    ProfilesRepository: ProfilesRepository,

    IGetProfileUseCase: IGetProfileUseCase,
    IGetProfileByEmailUseCase: IGetProfileByEmailUseCase,
    IGetAllProfilesUseCase: IGetAllProfilesUseCase,
    IGetAllProfilesController: IGetAllProfilesController,
    IGetAllProfilesForRoleUseCase: IGetAllProfilesForRoleUseCase,
    IGetAllProfilesForRoleController: IGetAllProfilesForRoleController,
    ICreateProfileUseCase: ICreateProfileUseCase,
    ICreateProfileController: ICreateProfileController,
    IUpdateProfileUseCase: IUpdateProfileUseCase,
    IUpdateProfileController: IUpdateProfileController

    IGetProfileController: IGetProfileController,
    IGetProfileByEmailController: IGetProfileByEmailController,
    IDeleteProfileUseCase: IDeleteProfileUseCase,
    IDeleteProfileController: IDeleteProfileController
}