import {
    IGetSpecificMeetingsByUserIdUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/get-specific-meetings-by-user-id.use-case";
import {InputParseError} from "@/src/entities/errors/common";
import {
    GetSpecificMeetingsByUserIdOptions, getSpecificMeetingsByUserIdOptionsSchema
} from "@/src/application/repositories/meetings/user-specific-meetings.repository.interface";

export type IGetSpecificMeetingsByUserIdController = ReturnType<typeof getSpecificMeetingsByUserIdController>;

export const getSpecificMeetingsByUserIdController = (
    getSpecificMeetingsByUserIdUseCase: IGetSpecificMeetingsByUserIdUseCase
) => async (opts: Partial<GetSpecificMeetingsByUserIdOptions>) => {

    const {data: parsedOpts, error} = getSpecificMeetingsByUserIdOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    return getSpecificMeetingsByUserIdUseCase(parsedOpts);
}