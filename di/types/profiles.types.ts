import {ProfilesRepository} from "@/src/infrastructure/repositories/auth/profiles.repository";
import {ICreateProfileUseCase} from "@/src/application/use-cases/auth/create-profile.use-case";
import {ICreateProfileController} from "@/src/interface-adapters/controllers/auth/create-profile.controller";
import {IDeleteProfileUseCase} from "@/src/application/use-cases/auth/delete-profile.use-case";
import {IDeleteProfileController} from "@/src/interface-adapters/controllers/auth/delete-profile.controller";
import {IGetProfileUseCase} from "@/src/application/use-cases/auth/get-profile.use-case";
import {IGetProfileController} from "@/src/interface-adapters/controllers/auth/get-profile.controller";
import {IGetProfileByEmailController} from "@/src/interface-adapters/controllers/auth/get-profile-by-email.controller";
import {IGetProfileByEmailUseCase} from "@/src/application/use-cases/auth/get-profile-by-email.use-case";

export const PROFILE_SYMBOLS = {
    ProfilesRepository: Symbol.for("ProfilesRepository"),

    IGetProfileUseCase: Symbol.for("IGetProfileUseCase"),
    IGetProfileByEmailUseCase: Symbol.for("IGetProfileByEmailUseCase"),
    ICreateProfileUseCase: Symbol.for("ICreateProfileUseCase"),
    ICreateProfileController: Symbol.for("ICreateProfileController"),

    IGetProfileController: Symbol.for("IGetProfileController"),
    IGetProfileByEmailController: Symbol.for("IGetProfileByEmailController"),
    IDeleteProfileUseCase: Symbol.for("IDeleteProfileUseCase"),
    IDeleteProfileController: Symbol.for("IDeleteProfileController")
}

export interface PROFILE_RETURN_TYPES {
    ProfilesRepository: ProfilesRepository,

    IGetProfileUseCase: IGetProfileUseCase,
    IGetProfileByEmailUseCase: IGetProfileByEmailUseCase,
    ICreateProfileUseCase: ICreateProfileUseCase,
    ICreateProfileController: ICreateProfileController,

    IGetProfileController: IGetProfileController,
    IGetProfileByEmailController: IGetProfileByEmailController,
    IDeleteProfileUseCase: IDeleteProfileUseCase,
    IDeleteProfileController: IDeleteProfileController
}