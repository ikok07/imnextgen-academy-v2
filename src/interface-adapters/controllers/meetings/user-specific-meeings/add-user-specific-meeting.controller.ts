import {
    IAddUserSpecificMeetingUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/add-user-specific-meeting.use-case";
import {UserSpecificMeetingInsert, userSpecificMeetingInsertSchema} from "@/drizzle/schema/user_specific_meetings";
import {AccessError} from "@/src/entities/models/auth/access";
import {IGetUserController} from "@/src/interface-adapters/controllers/auth/get-user.controller";
import {ICheckAccessController} from "@/src/interface-adapters/controllers/auth/check-access.controller";
import {InputParseError} from "@/src/entities/errors/common";

export type IAddUserSpecificMeetingController = ReturnType<typeof addUserSpecificMeetingController>;

export const addUserSpecificMeetingController = (
    addUserSpecificMeetingUseCase: IAddUserSpecificMeetingUseCase,
    getUserController: IGetUserController,
    checkAccessController: ICheckAccessController
) => async (data: Partial<UserSpecificMeetingInsert>) => {

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
        },
        action: "create"
    });

    if (!hasAccess) throw new AccessError("Unauthorized action!");

    const {data: parsedData, error} = userSpecificMeetingInsertSchema.safeParse(data);
    if (error) throw new InputParseError(`Invalid data! ${error}`);

    return addUserSpecificMeetingUseCase(parsedData);
}