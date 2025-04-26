import {IGetUserUseCase} from "@/src/application/use-cases/auth/get-user.use-case";

export type IGetUserController = ReturnType<typeof getUserController>;

export const getUserController = (
    getUserUseCase: IGetUserUseCase
)=> async (options: {excludeDbProfile?: boolean} | undefined) => {
    return await getUserUseCase(options?.excludeDbProfile);
}