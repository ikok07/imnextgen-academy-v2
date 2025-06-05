import {IAuthenticationService} from "@/src/application/services/auth/authentication.service.interface";

export type IDeleteUserUseCase = ReturnType<typeof deleteUserUseCase>;

export const deleteUserUseCase = (
    authenticationService: IAuthenticationService
) => async (userId: string) => {
    return authenticationService.deleteUser(userId);
}