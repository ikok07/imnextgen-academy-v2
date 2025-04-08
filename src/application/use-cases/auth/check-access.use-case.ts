import {
    CheckUserAccessOptions, checkUserAccessOptionsSchema,
    IAuthorizationService
} from "@/src/application/services/auth/authorization.service.interface";

export type ICheckAccessUseCase = ReturnType<typeof checkAccessUseCase>;

export const checkAccessUseCase = (
    authorizationService: IAuthorizationService
)=> async (opts: Partial<CheckUserAccessOptions>)=> {
    const parsedOptions = checkUserAccessOptionsSchema.parse(opts);
    return authorizationService.hasAccess(parsedOptions);
}