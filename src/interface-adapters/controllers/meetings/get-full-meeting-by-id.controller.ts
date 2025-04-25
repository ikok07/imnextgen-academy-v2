import {
    getFullMeetingByIdOptionsSchema,
    GetMultipleFullMeetingsByIdOptions,
    GetSingleFullMeetingByIdOptions
} from "@/src/application/repositories/meetings/meetings.repository.interface";
import {IGetFullMeetingByIdUseCase} from "@/src/application/use-cases/meetings/get-full-meeting-by-id.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetFullMeetingByIdController = ReturnType<typeof getFullMeetingByIdController>;

export const getFullMeetingByIdController = (
    getFullMeetingByIdUseCase: IGetFullMeetingByIdUseCase
) => (options: Partial<GetSingleFullMeetingByIdOptions> | Partial<GetMultipleFullMeetingsByIdOptions> | undefined) => {

    const {data: parsedOptions, error: parseError} = getFullMeetingByIdOptionsSchema.safeParse(options);
    if (parseError) throw new InputParseError("Invalid options object!");

    return getFullMeetingByIdUseCase(parsedOptions);
}