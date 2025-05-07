import {IUpdateProfileUseCase} from "@/src/application/use-cases/auth/update-profile.use-case";
import {ProfileInsert} from "@/drizzle/schema/profiles";
import {InputParseError} from "@/src/entities/errors/common";

export type IUpdateProfileController = ReturnType<typeof updateProfileController>;

export const updateProfileController = (
    updateProfileUseCase: IUpdateProfileUseCase
) => async (userId: string | undefined, data: Partial<ProfileInsert>) => {

    if (!userId) throw new InputParseError("Invalid userId!");

    return updateProfileUseCase(userId, data);
}