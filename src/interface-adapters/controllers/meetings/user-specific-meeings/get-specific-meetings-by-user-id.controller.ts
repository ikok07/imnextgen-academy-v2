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
import {
    ICheckResourcesAccessController
} from "@/src/interface-adapters/controllers/auth/check-resources-access.controller";

export type IGetSpecificMeetingsByUserIdController = ReturnType<typeof getSpecificMeetingsByUserIdController>;

export const getSpecificMeetingsByUserIdController = (
    getSpecificMeetingsByUserIdUseCase: IGetSpecificMeetingsByUserIdUseCase,
    getUserController: IGetUserController,
    checkResourcesAccessController: ICheckResourcesAccessController
) => async (opts: Partial<GetSpecificMeetingsByUserIdOptions>) => {

    const {data: parsedOpts, error} = getSpecificMeetingsByUserIdOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    const {user, dbProfile} = await getUserController();
    if (!user || !dbProfile) throw new AccessError("Could not verify access! User could not be found!");

    const meetings = await getSpecificMeetingsByUserIdUseCase(parsedOpts);
    if (meetings.length === 0) return [];

    const accessResults = await checkResourcesAccessController({
        principal: {
            id: user.id,
            roles: dbProfile.roles
        },
        resources: meetings.map(m => ({
            resource: {
                id: m.id,
                kind: "specific-meeting",
                attr: {
                    profile_id: opts.userId,
                    mentor_profile_id: m.mentor_profile_id
                }
            },
            actions: ["select"]
        })),
    });

    return meetings.filter(m => accessResults.some(r => r.resourceId === m.id && r.actions["select"] === "EFFECT_ALLOW"));
}