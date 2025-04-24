import {IGetMeetingsUseCase} from "@/src/application/use-cases/meetings/get-meetings.use-case";

export type IGetMeetingsController = ReturnType<typeof getMeetingsController>;

export const getMeetingsController = (
    getMeetingsUseCase: IGetMeetingsUseCase
) => () => {
    return getMeetingsUseCase();
}