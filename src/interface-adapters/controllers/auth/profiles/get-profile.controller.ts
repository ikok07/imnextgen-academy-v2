import {IGetProfileUseCase} from "@/src/application/use-cases/auth/profiles/get-profile.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetProfileController = ReturnType<typeof getProfileController>;

export const getProfileController = (
    getProfileUseCase: IGetProfileUseCase
) => async (userId: string | undefined) => {

    if (!userId) throw new InputParseError("Invalid userId!");

    return getProfileUseCase(userId);
}