import {
    IGetSpecificMeetingsByMentorProfileIdUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/get-specific-meetings-by-mentor-profile-id.use-case";
import {
    GetSpecificMeetingsByMentorProfileIdOptions, getSpecificMeetingsByMentorProfileIdOptionsSchema
} from "@/src/application/repositories/meetings/user-specific-meetings.repository.interface";
import {InputParseError} from "@/src/entities/errors/common";
import {IGetUserController} from "@/src/interface-adapters/controllers/auth/get-user.controller";
import {AccessError} from "@/src/entities/models/auth/access";
import {
    ICheckResourcesAccessController
} from "@/src/interface-adapters/controllers/auth/check-resources-access.controller";

export type IGetSpecificMeetingsByMentorProfileIdController = ReturnType<typeof getSpecificMeetingsByMentorProfileIdController>;

export const getSpecificMeetingsByMentorProfileIdController = (
    getSpecificMeetingsByMentorProfileIdUseCase: IGetSpecificMeetingsByMentorProfileIdUseCase,
    getUserController: IGetUserController,
    checkResourcesAccessController: ICheckResourcesAccessController
) => async (opts: Partial<GetSpecificMeetingsByMentorProfileIdOptions>) => {

    const {data: parsedOpts, error} = getSpecificMeetingsByMentorProfileIdOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    const {user, dbProfile} = await getUserController();
    if (!user || !dbProfile) throw new AccessError("Could not verify access! User could not be found!");

    const meetings = await getSpecificMeetingsByMentorProfileIdUseCase(parsedOpts);

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