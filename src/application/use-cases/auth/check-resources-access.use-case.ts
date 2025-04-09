import {
    CheckResourceOptions,
    IAuthorizationService
} from "@/src/application/services/auth/authorization.service.interface";

export type ICheckResourcesAccessUseCase = ReturnType<typeof checkResourcesAccessUseCase>;

export const checkResourcesAccessUseCase = (
    authorizationService: IAuthorizationService
) => async (opts: CheckResourceOptions) => {
    return authorizationService.checkResources(opts)
}