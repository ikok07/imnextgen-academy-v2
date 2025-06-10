import {
    getFullRegularMeetingByIdOptionsSchema,
    GetMultipleRegularFullMeetingsByIdOptions,
    GetSingleRegularFullMeetingByIdOptions
} from "@/src/application/repositories/meetings/meetings.repository.interface";
import {IGetFullRegularMeetingByIdUseCase} from "@/src/application/use-cases/meetings/get-full-regular-meeting-by-id-use.case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetFullRegularMeetingByIdController = ReturnType<typeof getFullRegularMeetingByIdController>;

export const getFullRegularMeetingByIdController = (
    getFullMeetingByIdUseCase: IGetFullRegularMeetingByIdUseCase
) => (options: Partial<GetSingleRegularFullMeetingByIdOptions> | Partial<GetMultipleRegularFullMeetingsByIdOptions> | undefined) => {

    const {data: parsedOptions, error: parseError} = getFullRegularMeetingByIdOptionsSchema.safeParse(options);
    if (parseError) throw new InputParseError("Invalid options object!");

    return getFullMeetingByIdUseCase(parsedOptions);
}