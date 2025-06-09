import {ICalendarIdsRepository} from "@/src/application/repositories/calendar/calendar-ids.repository.interface";

export type IGetCalendarIdByUserIdUseCase = ReturnType<typeof getCalendarIdByUserIdUseCase>;

export const getCalendarIdByUserIdUseCase = (
    calendarIdsRepository: ICalendarIdsRepository
) => async (userId: string) => {
    return calendarIdsRepository.getCalendarIdByUserId(userId);
}