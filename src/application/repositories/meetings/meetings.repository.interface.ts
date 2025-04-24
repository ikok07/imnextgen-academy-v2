import {FullMeeting, Meeting, MeetingInsert} from "@/drizzle/schema/meetings";

export interface IMeetingsRepository {
    getMeetings(): Promise<Meeting[]>;
    getFullMeetingById(id: string): Promise<FullMeeting | undefined>;
    getMeetingById(id: string): Promise<Meeting | undefined>;
    addMeeting(meeting: MeetingInsert): Promise<Meeting[]>;
    removeMeetingById(id: string): Promise<Meeting[]>;
    updateMeetingById(id: string, data: object): Promise<Meeting[]>;
}