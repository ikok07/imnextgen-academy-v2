import {
    IGetMentorSchedulesUseCase
} from "@/src/application/use-cases/meetings/mentor-schedules/get-mentor-schedules.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetMentorSchedulesController = ReturnType<typeof getMentorSchedulesController>;

export const getMentorSchedulesController = (
    getMentorSchedulesUseCase: IGetMentorSchedulesUseCase
) => async (userId: string | undefined) => {

    if (!userId) throw new InputParseError("Invalid userId!");

    return getMentorSchedulesUseCase(userId);
}