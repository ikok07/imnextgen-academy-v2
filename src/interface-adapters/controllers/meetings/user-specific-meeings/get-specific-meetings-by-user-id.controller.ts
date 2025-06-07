import {
    IGetSpecificMeetingsByUserIdUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/get-specific-meetings-by-user-id.use-case";
import {InputParseError} from "@/src/entities/errors/common";
import {
    GetSpecificMeetingsByUserIdOptions, getSpecificMeetingsByUserIdOptionsSchema
} from "@/src/application/repositories/meetings/user-specific-meetings.repository.interface";
import {ICheckAccessController} from "@/src/interface-adapters/controllers/auth/check-access.controller";
import {IGetUserController} from "@/src/interface-adapters/controllers/auth/get-user.controller";
import {AccessError} from "@/src/entities/models/auth/access";

export type IGetSpecificMeetingsByUserIdController = ReturnType<typeof getSpecificMeetingsByUserIdController>;

export const getSpecificMeetingsByUserIdController = (
    getSpecificMeetingsByUserIdUseCase: IGetSpecificMeetingsByUserIdUseCase,
    getUserController: IGetUserController,
    checkAccessController: ICheckAccessController
) => async (opts: Partial<GetSpecificMeetingsByUserIdOptions>) => {

    const {data: parsedOpts, error} = getSpecificMeetingsByUserIdOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    const {user, dbProfile} = await getUserController();
    if (!user || !dbProfile) throw new AccessError("Could not verify access! User could not be found!");

    const hasAccess = await checkAccessController({
        principal: {
            id: user.id,
            roles: dbProfile.roles
        },
        resource: {
            id: "specific-meeting",
            kind: "specific-meeting",
            attr: {
                profile_id: opts.userId
            }
        },
        action: "select"
    });

    if (!hasAccess) throw new AccessError("Unauthorized action!");

    return getSpecificMeetingsByUserIdUseCase(parsedOpts);
}