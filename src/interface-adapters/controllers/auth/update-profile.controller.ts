import {IUpdateProfileUseCase} from "@/src/application/use-cases/auth/update-profile.use-case";
import {InputParseError} from "@/src/entities/errors/common";
import {
    UpdateProfileOptions,
    updateProfileOptionsSchema
} from "@/src/application/repositories/auth/profiles.repository.interface";

export type IUpdateProfileController = ReturnType<typeof updateProfileController>;

export const updateProfileController = (
    updateProfileUseCase: IUpdateProfileUseCase
) => async (opts: Partial<UpdateProfileOptions>) => {

    const {data, error} = updateProfileOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError("Invalid options!");

    return updateProfileUseCase(data);
}