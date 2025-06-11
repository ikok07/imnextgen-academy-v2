import {
    GetSpecificMeetingsByUserIdOptions,
    getSpecificMeetingsByUserIdOptionsSchema
} from "@/src/application/repositories/meetings/user-specific-meetings.repository.interface";
import {InputParseError} from "@/src/entities/errors/common";
import {
    IGetSpecificMeetingsByUserIdUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/get-specific-meetings-by-user-id.use-case";

export type ISystemGetUserSpecificMeetingsByUserIdController = ReturnType<typeof systemGetUserSpecificMeetingsByUserIdController>;

export const systemGetUserSpecificMeetingsByUserIdController = (
    getSpecificMeetingsByUserIdUseCase: IGetSpecificMeetingsByUserIdUseCase,
) => async (opts: Partial<GetSpecificMeetingsByUserIdOptions>) => {

    const {data: parsedOpts, error} = getSpecificMeetingsByUserIdOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    return await getSpecificMeetingsByUserIdUseCase(parsedOpts);
}