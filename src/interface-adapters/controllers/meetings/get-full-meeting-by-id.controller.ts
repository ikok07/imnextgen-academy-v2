import {IGetFullMeetingByIdUseCase} from "@/src/application/use-cases/meetings/get-full-meeting-by-id.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetFullMeetingByIdController = ReturnType<typeof getFullMeetingByIdController>;

export const getFullMeetingByIdController = (
    getFullMeetingByIdUseCase: IGetFullMeetingByIdUseCase
) => (id: string | undefined) => {

    if (!id) throw new InputParseError("Invalid meetingId!");

    return getFullMeetingByIdUseCase(id);
}