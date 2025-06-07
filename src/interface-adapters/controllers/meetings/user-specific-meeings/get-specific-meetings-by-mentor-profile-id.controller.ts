import {
    IGetSpecificMeetingsByMentorProfileIdUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/get-specific-meetings-by-mentor-profile-id.use-case";
import {
    GetSpecificMeetingsByMentorProfileIdOptions, getSpecificMeetingsByMentorProfileIdOptionsSchema
} from "@/src/application/repositories/meetings/user-specific-meetings.repository.interface";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetSpecificMeetingsByMentorProfileIdController = ReturnType<typeof getSpecificMeetingsByMentorProfileIdController>;

export const getSpecificMeetingsByMentorProfileIdController = (
    getSpecificMeetingsByMentorProfileIdUseCase: IGetSpecificMeetingsByMentorProfileIdUseCase
) => async (opts: Partial<GetSpecificMeetingsByMentorProfileIdOptions>) => {

    const {data: parsedOpts, error} = getSpecificMeetingsByMentorProfileIdOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    return getSpecificMeetingsByMentorProfileIdUseCase(parsedOpts);
}