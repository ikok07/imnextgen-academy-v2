import {
    IGetSignedUpUserForMeetingUseCase
} from "@/src/application/use-cases/meetings/meeting-signed-up-users/get-signed-up-user-for-meeting.use-case";
import {
    GetSignedUpUserOptions, getSignedUpUserOptionsSchema
} from "@/src/application/repositories/meetings/meeting-signed-up-users.repository.interface";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetSignedUpUserForMeetingController = ReturnType<typeof getSignedUpUserForMeetingController>;

export const getSignedUpUserForMeetingController = (
    getSignedUpUserForMeetingController: IGetSignedUpUserForMeetingUseCase
) => async (opts: Partial<GetSignedUpUserOptions>) => {

    const {data, error} = getSignedUpUserOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError("Invalid options!");
    
    return getSignedUpUserForMeetingController(data);
}