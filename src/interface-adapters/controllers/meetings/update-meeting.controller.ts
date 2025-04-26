import {IUpdateMeetingUseCase} from "@/src/application/use-cases/meetings/update-meeting.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IUpdateMeetingController = ReturnType<typeof updateMeetingController>;

export const updateMeetingController = (
    updateMeetingUseCase: IUpdateMeetingUseCase
) => (id: string | undefined, data: object | undefined) => {

    if (!id) throw new InputParseError("Invalid meetings id!");
    if (!data) throw new InputParseError("Invalid data object!");

    return updateMeetingUseCase(id, data)
}