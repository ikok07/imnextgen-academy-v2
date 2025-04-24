import {IGetMeetingByIdUseCase} from "@/src/application/use-cases/meetings/get-meeting-by-id.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetMeetingByIdController = ReturnType<typeof getMeetingByIdController>;

export const getMeetingByIdController = (
    getMeetingByIdUseCase: IGetMeetingByIdUseCase
) => (id: string | undefined) => {

    if (!id) throw new InputParseError("Invalid id!");

    return getMeetingByIdUseCase(id);
}