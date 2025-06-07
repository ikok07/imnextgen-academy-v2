import {
    IGetSpecificMeetingsByMentorProfileIdUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/get-specific-meetings-by-mentor-profile-id.use-case";
import {
    GetSpecificMeetingsByMentorProfileIdOptions, getSpecificMeetingsByMentorProfileIdOptionsSchema
} from "@/src/application/repositories/meetings/user-specific-meetings.repository.interface";
import {InputParseError} from "@/src/entities/errors/common";
import {IGetUserController} from "@/src/interface-adapters/controllers/auth/get-user.controller";
import {ICheckAccessController} from "@/src/interface-adapters/controllers/auth/check-access.controller";
import {AccessError} from "@/src/entities/models/auth/access";

export type IGetSpecificMeetingsByMentorProfileIdController = ReturnType<typeof getSpecificMeetingsByMentorProfileIdController>;

export const getSpecificMeetingsByMentorProfileIdController = (
    getSpecificMeetingsByMentorProfileIdUseCase: IGetSpecificMeetingsByMentorProfileIdUseCase,
    getUserController: IGetUserController,
    checkAccessController: ICheckAccessController
) => async (opts: Partial<GetSpecificMeetingsByMentorProfileIdOptions>) => {

    const {data: parsedOpts, error} = getSpecificMeetingsByMentorProfileIdOptionsSchema.safeParse(opts);
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
                mentor_profile_id: opts.mentorProfileId
            }
        },
        action: "select"
    });

    if (!hasAccess) throw new AccessError("Unauthorized action!");

    return getSpecificMeetingsByMentorProfileIdUseCase(parsedOpts);
}