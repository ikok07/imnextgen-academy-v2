import {
    GetSpecificMeetingsByUserIdOptions,
    IUserSpecificMeetingsRepository
} from "@/src/application/repositories/meetings/user-specific-meetings.repository.interface";
import {FullSpecificMeeting} from "@/src/entities/models/meetings/full-meeting";
import {getFullSpecificMeetingData} from "@/src/entities/utils/meetings/get-full-specific-meeting-data.utils";

export type IGetFullSpecificMeetingByUserIdUseCase = ReturnType<typeof getFullSpecificMeetingByUserIdUseCase>;

export const getFullSpecificMeetingByUserIdUseCase = (
    userSpecificMeetingsRepository: IUserSpecificMeetingsRepository
) => async (opts: GetSpecificMeetingsByUserIdOptions) => {
    const rawResults = await userSpecificMeetingsRepository.getSpecificMeetingsByUserId(opts);
    return rawResults.map(r => getFullSpecificMeetingData(r)) as FullSpecificMeeting[];
}