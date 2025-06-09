import {IDeleteProfileUseCase} from "@/src/application/use-cases/auth/profiles/delete-profile.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IDeleteProfileController = ReturnType<typeof deleteProfileController>;

export const deleteProfileController = (
    deleteProfileUseCase: IDeleteProfileUseCase
) => async (id?: string) => {
    if (!id) throw new InputParseError("Invalid profile id!");
    return deleteProfileUseCase(id);
}