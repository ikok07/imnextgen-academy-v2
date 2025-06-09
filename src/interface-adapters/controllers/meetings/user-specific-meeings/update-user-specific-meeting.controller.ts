import {
    IUpdateUserSpecificMeetingUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/update-user-specific-meeting.use-case";
import {UserSpecificMeetingInsert, userSpecificMeetingInsertSchema} from "@/drizzle/schema/user_specific_meetings";
import {IGetUserController} from "@/src/interface-adapters/controllers/auth/get-user.controller";
import {ICheckAccessController} from "@/src/interface-adapters/controllers/auth/check-access.controller";
import {AccessError} from "@/src/entities/models/auth/access";
import {InputParseError} from "@/src/entities/errors/common";

export type IUpdateUserSpecificMeetingController = ReturnType<typeof updateUserSpecificMeetingController>;

export const updateUserSpecificMeetingController = (
    updateUserSpecificMeetingUseCase: IUpdateUserSpecificMeetingUseCase,
    getUserController: IGetUserController,
    checkAccessController: ICheckAccessController
) => async (data: Partial<UserSpecificMeetingInsert>, currMentorProfileId: string) => {

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
                mentor_profile_id: currMentorProfileId // Separate variable in case the updated meeting has other mentor profile id
            }
        },
        action: "update"
    });

    if (!hasAccess) throw new AccessError("Unauthorized action!");

    return updateUserSpecificMeetingUseCase(data);
}