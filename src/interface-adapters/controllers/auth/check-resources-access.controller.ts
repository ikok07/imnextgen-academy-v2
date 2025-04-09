import {ICheckResourcesAccessUseCase} from "@/src/application/use-cases/auth/check-resources-access.use-case";
import {
    CheckResourceOptions,
    checkResourcesOptionsSchema
} from "@/src/application/services/auth/authorization.service.interface";
import {InputParseError} from "@/src/entities/errors/common";

export type ICheckResourcesAccessController = ReturnType<typeof checkResourcesAccessController>;

export const checkResourcesAccessController = (
    checkResourcesAccessUseCase: ICheckResourcesAccessUseCase
) => async (opts: Partial<CheckResourceOptions>) => {

    const {data: parsedOptions, error} = checkResourcesOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError(`Invalid check resources options! ${error}`);

    await checkResourcesAccessUseCase(parsedOptions);
}