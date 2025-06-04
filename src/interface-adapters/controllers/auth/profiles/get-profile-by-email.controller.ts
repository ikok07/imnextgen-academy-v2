import {IGetProfileByEmailUseCase} from "@/src/application/use-cases/auth/profiles/get-profile-by-email.use-case";
import {InputParseError} from "@/src/entities/errors/common";
import {z} from "zod";

export type IGetProfileByEmailController = ReturnType<typeof getProfileByEmailController>;

export const getProfileByEmailController = (
    getProfileByEmailUseCase: IGetProfileByEmailUseCase
) => async (email: string | undefined) => {

    const {data: parsedEmail, error} = z.string().email().safeParse(email);
    if (error) throw new InputParseError("Invalid email!");

    return getProfileByEmailUseCase(parsedEmail);
}