import {
    IRemoveUserSpecificMeetingUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/remove-user-specific-meeting.use-case";
import {AccessError} from "@/src/entities/models/auth/access";
import {IGetUserController} from "@/src/interface-adapters/controllers/auth/get-user.controller";
import {ICheckAccessController} from "@/src/interface-adapters/controllers/auth/check-access.controller";
import {InputParseError} from "@/src/entities/errors/common";

export type IRemoveUserSpecificMeetingController = ReturnType<typeof removeUserSpecificMeetingController>;

export const removeUserSpecificMeetingController = (
    removeUserSpecificMeetingUseCase: IRemoveUserSpecificMeetingUseCase,
    getUserController: IGetUserController,
    checkAccessController: ICheckAccessController
) => async (id: string | undefined, mentorProfileId: string | undefined) => {

    if (!id) throw new InputParseError("Invalid specific meeting id!");
    if (!mentorProfileId) throw new InputParseError("Invalid mentor profile id!");

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
                mentor_profile_id: mentorProfileId
            }
        },
        action: "delete"
    });

    if (!hasAccess) throw new AccessError("Unauthorized action!");

    return removeUserSpecificMeetingUseCase(id);
}