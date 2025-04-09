import {ICreateProfileUseCase} from "@/src/application/use-cases/auth/create-profile.use-case";
import {ProfileInsert, profilesInsertSchema} from "@/drizzle/schema/profiles";
import {InputParseError} from "@/src/entities/errors/common";

export type ICreateProfileController = ReturnType<typeof createProfileController>;

export const createProfileController = (
    createProfileUseCase: ICreateProfileUseCase
)=> async (data?: Partial<ProfileInsert>) => {
    const {data: parsedProfile, error} = profilesInsertSchema.safeParse(data);
    if (error) throw new InputParseError(`Invalid profile! ${error}`);

    return createProfileUseCase(parsedProfile);
}