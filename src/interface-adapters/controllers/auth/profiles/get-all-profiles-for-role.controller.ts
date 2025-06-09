import {IGetAllProfilesForRoleUseCase} from "@/src/application/use-cases/auth/profiles/get-all-profiles-for-role.use-case";
import {userRoleTypeSchema} from "@/drizzle/schema/user_roles";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetAllProfilesForRoleController = ReturnType<typeof getAllProfilesForRoleController>;

export const getAllProfilesForRoleController = (
    getAllProfilesForRoleUseCase: IGetAllProfilesForRoleUseCase
) => async (role: string | undefined) => {

    const {data: parsedRole, error} = userRoleTypeSchema.safeParse(role);
    if (error) throw new InputParseError("Invalid role!");

    return getAllProfilesForRoleUseCase(parsedRole);
}