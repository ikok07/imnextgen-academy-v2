import {
    GetAllUsersForRoleOptions,
    IAuthenticationService
} from "@/src/application/services/auth/authentication.service.interface";

export type IGetAllUsersForRoleUseCase = ReturnType<typeof getAllUsersForRoleUseCase>;

export const getAllUsersForRoleUseCase = (
    authenticationService: IAuthenticationService
) => async (opts: GetAllUsersForRoleOptions) => {
    return authenticationService.getAllUsersForRole(opts);
}