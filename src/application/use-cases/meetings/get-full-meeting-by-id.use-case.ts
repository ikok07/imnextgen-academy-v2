import {
    GetMultipleFullMeetingsByIdOptions,
    GetSingleFullMeetingByIdOptions,
    IMeetingsRepository
} from "@/src/application/repositories/meetings/meetings.repository.interface";
import {FullMeeting} from "@/drizzle/schema/meetings";

export type IGetFullMeetingByIdUseCase = ReturnType<typeof getFullMeetingByIdUseCase>;

export const getFullMeetingByIdUseCase = (
    meetingsRepository: IMeetingsRepository
) => async (options: GetSingleFullMeetingByIdOptions | GetMultipleFullMeetingsByIdOptions) => {
    const fullMeetingsRawResults = await meetingsRepository.getFullMeetingById(options);
    if (!fullMeetingsRawResults) return undefined;

    const fullMeetings = new Map<string, FullMeeting>();

    for (const result of fullMeetingsRawResults) {
        if (!fullMeetings.has(result.meeting.id)) {
            fullMeetings.set(result.meeting.id, {
                ...result.meeting,
                meeting_dates: [],
                repeat_days: [],
                excluded_dates: [],
            });
        }

        const fullMeeting = fullMeetings.get(result.meeting.id)!;

        if (result.meeting_date && !fullMeeting.meeting_dates.some(d => d.id === result.meeting_date!.id))
            fullMeeting.meeting_dates.push(result.meeting_date);

        if (result.excluded_date && !fullMeeting.excluded_dates.some(d => d.id === result.excluded_date!.id))
            fullMeeting.excluded_dates.push(result.excluded_date);

        if (result.repeat_day && !fullMeeting.repeat_days.some(d => d.id === result.repeat_day!.id))
            fullMeeting.repeat_days.push(result.repeat_day);
    }

    const fullMeetingsArr = Array.from(fullMeetings.values());
    return options.type === "single" ? fullMeetingsArr[0] : fullMeetingsArr;
}