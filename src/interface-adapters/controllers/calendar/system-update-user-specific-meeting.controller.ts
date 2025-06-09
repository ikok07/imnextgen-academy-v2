import {UserSpecificMeetingInsert, userSpecificMeetingInsertSchema} from "@/drizzle/schema/user_specific_meetings";
import {InputParseError} from "@/src/entities/errors/common";
import {
    IUpdateUserSpecificMeetingUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/update-user-specific-meeting.use-case";

export type ISystemUpdateUserSpecificMeetingController = ReturnType<typeof systemUpdateUserSpecificMeetingController>;

export const systemUpdateUserSpecificMeetingController = (
    updateUserSpecificMeetingUseCase: IUpdateUserSpecificMeetingUseCase,
) => async (data: Partial<UserSpecificMeetingInsert>) => {
    const {data: parsedData, error} = userSpecificMeetingInsertSchema.safeParse(data);
    if (error) throw new InputParseError(`Invalid data! ${error}`);

    return updateUserSpecificMeetingUseCase(parsedData);
}