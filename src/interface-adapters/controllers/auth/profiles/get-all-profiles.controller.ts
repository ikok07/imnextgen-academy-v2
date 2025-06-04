import {IGetAllProfilesUseCase} from "@/src/application/use-cases/auth/profiles/get-all-profiles.use-case";
import {
    GetAllProfilesOptions,
    getAllProfilesOptionsSchema
} from "@/src/application/repositories/auth/profiles.repository.interface";
import {InputParseError} from "@/src/entities/errors/common";
import {ICheckAccessController} from "@/src/interface-adapters/controllers/auth/check-access.controller";
import {IGetUserController} from "@/src/interface-adapters/controllers/auth/get-user.controller";
import {AccessError} from "@/src/entities/models/auth/access";

export type IGetAllProfilesController = ReturnType<typeof getAllProfilesController>;

export const getAllProfilesController = (
    getAllProfilesUseCase: IGetAllProfilesUseCase,
    getUserController: IGetUserController,
    checkAccessController: ICheckAccessController
) => async (opts?: Partial<GetAllProfilesOptions>) => {

    const {user, dbProfile} = await getUserController();
    if (!user || !dbProfile) throw new AccessError("Could not verify access! User could not be found!");

    const hasAccess = await checkAccessController({
        principal: {
            id: user.id,
            roles: dbProfile.roles
        },
        resource: {
            id: "profile",
            kind: "profile"
        },
        action: "select"
    });

    if (!hasAccess) throw new AccessError("Unauthorized action!");

    if (opts) {
        const {data: parsedOpts, error} = getAllProfilesOptionsSchema.safeParse(opts);
        if (error) throw new InputParseError(`Invalid get all profiles options! ${error}`);
        return getAllProfilesUseCase(parsedOpts);
    }

    return getAllProfilesUseCase({});
}