import {IMeetingsRepository} from "@/src/application/repositories/meetings/meetings.repository.interface";
import {MeetingInsert} from "@/drizzle/schema/meetings";

export type IAddMeetingUseCase = ReturnType<typeof addMeetingUseCase>;

export const addMeetingUseCase = (
    meetingsRepository: IMeetingsRepository
) => (meeting: MeetingInsert) => {
    return meetingsRepository.addMeeting(meeting)
}