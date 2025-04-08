import {ProfilesRepository} from "@/src/infrastructure/repositories/auth/profiles.repository";
import {ICreateProfileUseCase} from "@/src/application/use-cases/auth/create-profile.use-case";
import {ICreateProfileController} from "@/src/interface-adapters/controllers/auth/create-profile.controller";
import {IDeleteProfileUseCase} from "@/src/application/use-cases/auth/delete-profile.use-case";
import {IDeleteProfileController} from "@/src/interface-adapters/controllers/auth/delete-profile.controller";

export const PROFILE_SYMBOLS = {
    ProfilesRepository: Symbol.for("ProfilesRepository"),

    ICreateProfileUseCase: Symbol.for("ICreateProfileUseCase"),
    ICreateProfileController: Symbol.for("ICreateProfileController"),

    IDeleteProfileUseCase: Symbol.for("IDeleteProfileUseCase"),
    IDeleteProfileController: Symbol.for("IDeleteProfileController")
}

export interface PROFILE_RETURN_TYPES {
    ProfilesRepository: ProfilesRepository,

    ICreateProfileUseCase: ICreateProfileUseCase,
    ICreateProfileController: ICreateProfileController,

    IDeleteProfileUseCase: IDeleteProfileUseCase,
    IDeleteProfileController: IDeleteProfileController
}