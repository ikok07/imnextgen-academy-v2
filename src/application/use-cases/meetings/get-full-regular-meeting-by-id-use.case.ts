import {
    GetMultipleRegularFullMeetingsByIdOptions,
    GetSingleRegularFullMeetingByIdOptions,
    IMeetingsRepository
} from "@/src/application/repositories/meetings/meetings.repository.interface";
import {FullRegularMeeting} from "@/src/entities/models/meetings/full-meeting";

export type IGetFullRegularMeetingByIdUseCase = ReturnType<typeof getFullRegularMeetingByIdUseCase>;

export const getFullRegularMeetingByIdUseCase = (
    meetingsRepository: IMeetingsRepository
) => async (options: GetSingleRegularFullMeetingByIdOptions | GetMultipleRegularFullMeetingsByIdOptions) => {
    const fullMeetingsRawResults = await meetingsRepository.getFullRegularMeetingById(options);
    if (!fullMeetingsRawResults) return undefined;

    const fullMeetings = new Map<string, FullRegularMeeting>();

    for (const result of fullMeetingsRawResults) {
        if (!fullMeetings.has(result.meeting.id)) {
            fullMeetings.set(result.meeting.id, {
                meetingType: "regular",
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