export interface ICalendarIdsRepository {
    getCalendarIdByUserId(userId: string): Promise<string>;
}