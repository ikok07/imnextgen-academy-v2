import {IGetModuleByIdUseCase} from "@/src/application/use-cases/media/modules/get-module-by-id.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetModuleByIdController = ReturnType<typeof getModuleByIdController>;

export const getModuleByIdController = (
    getModuleByIdUseCase: IGetModuleByIdUseCase
) => async (id: string | undefined | null) => {

    if (!id) throw new InputParseError("Invalid module id!");

    return getModuleByIdUseCase(id);
}