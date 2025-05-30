import {IGetAllUsersForRoleUseCase} from "@/src/application/use-cases/auth/get-all-users-for-role.use-case";
import {UserRole, userRoleSchema} from "@/src/entities/models/auth/user-roles";
import {InputParseError} from "@/src/entities/errors/common";
import {
    GetAllUsersForRoleOptions,
    getAllUsersForRoleOptionsSchema
} from "@/src/application/services/auth/authentication.service.interface";

export type IGetAllUsersForRoleController = ReturnType<typeof getAllUsersForRoleController>;

export const getAllUsersForRoleController = (
    getAllUsersForRoleUseCase: IGetAllUsersForRoleUseCase
) => async (opts: Partial<GetAllUsersForRoleOptions>) => {

    const {data: parsedOptions, error} = getAllUsersForRoleOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    return getAllUsersForRoleUseCase(parsedOptions);
}