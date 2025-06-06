import {
    IUserSpecificMeetingsRepository
} from "@/src/application/repositories/meetings/user-specific-meetings.repository.interface";

export type IGetSpecificMeetingsByUserIdUseCase = ReturnType<typeof getSpecificMeetingsByUserIdUseCase>;

export const getSpecificMeetingsByUserIdUseCase = (
    userSpecificMeetingsRepository: IUserSpecificMeetingsRepository
) => async (userId: string, timezoneOffsetMin: number = new Date().getTimezoneOffset(), startDate?: number) => {
    return userSpecificMeetingsRepository.getSpecificMeetingsByUserId(userId, timezoneOffsetMin, startDate)
}