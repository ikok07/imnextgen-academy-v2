import {ICreateModuleUseCase} from "@/src/application/use-cases/media/modules/create-module.use-case";
import {ModuleInsert, modulesTableInsertSchema} from "@/drizzle/schema/modules";
import {InputParseError} from "@/src/entities/errors/common";

export type ICreateModuleController = ReturnType<typeof createModuleController>;

export const createModuleController = (
    createModuleUseCase: ICreateModuleUseCase
) => async (data: Partial<ModuleInsert>) => {

    const {data: parsedData, error} = modulesTableInsertSchema.safeParse(data);
    if (error) throw new InputParseError(`Invalid data! ${error}`);

    return createModuleUseCase(parsedData);
}