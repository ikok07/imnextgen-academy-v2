import {
    IGetFullSpecificMeetingByUserIdUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/get-full-specific-meeting-by-user-id.use-case";
import {
    GetSpecificMeetingsByUserIdOptions, getSpecificMeetingsByUserIdOptionsSchema
} from "@/src/application/repositories/meetings/user-specific-meetings.repository.interface";
import {InputParseError} from "@/src/entities/errors/common";
import {ICheckResourcesAccessUseCase} from "@/src/application/use-cases/auth/check-resources-access.use-case";
import {IGetUserUseCase} from "@/src/application/use-cases/auth/get-user.use-case";
import {AccessError} from "@/src/entities/models/auth/access";

export type IGetFullSpecificMeetingByUserIdController = ReturnType<typeof getFullSpecificMeetingByUserIdController>;

export const getFullSpecificMeetingByUserIdController = (
    getFullSpecificMeetingByUserIdUseCase: IGetFullSpecificMeetingByUserIdUseCase,
    getUserUseCase: IGetUserUseCase,
    checkResourcesAccessUseCase: ICheckResourcesAccessUseCase
) => async (opts: GetSpecificMeetingsByUserIdOptions) => {
    const {data: parsedOpts, error} = getSpecificMeetingsByUserIdOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    const fullSpecificMeetings = await getFullSpecificMeetingByUserIdUseCase(parsedOpts);

    const {dbProfile} = await getUserUseCase();
    if (!dbProfile) throw new AccessError("Could not verify access! Database profile could not be found!");

    const accessResults = await checkResourcesAccessUseCase({
        principal: {
            id: parsedOpts.userId,
            roles: dbProfile.roles
        },
        resources: fullSpecificMeetings.map(m => ({
            resource: {
                id: m.id,
                kind: "specific-meeting",
                attr: {
                    profile_id: opts.userId,
                    mentor_profile_id: m.mentor_profile_id
                }
            },
            actions: ["select"]
        }))
    });

    return fullSpecificMeetings.filter(m => accessResults.some(r => r.resourceId === m.id && r.actions["select"] === "EFFECT_ALLOW"));
}