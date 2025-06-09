import {IRemoveMeetingUseCase} from "@/src/application/use-cases/meetings/remove-meeting.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IRemoveMeetingController = ReturnType<typeof removeMeetingController>;

export const removeMeetingController = (
    removeMeetingUseCase: IRemoveMeetingUseCase
) => (id: string | undefined) => {

    if (!id) throw new InputParseError("Invalid calendar id!");

    return removeMeetingUseCase(id)
}