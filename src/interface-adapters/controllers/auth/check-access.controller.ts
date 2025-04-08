import {ICheckAccessUseCase} from "@/src/application/use-cases/auth/check-access.use-case";
import {getInjection} from "@/di/container";

export type ICheckAccessController = ReturnType<typeof checkAccessController>;

export const checkAccessController = (
    checkAccessUseCase: ICheckAccessUseCase
) => async (opts: Partial<ICheckAccessUseCase>) => {
    const getUserUseCase = getInjection("IGetUserUseCase");
    const user = await getUserUseCase();

    if (!user) return false;

    return checkAccessUseCase(opts);
}