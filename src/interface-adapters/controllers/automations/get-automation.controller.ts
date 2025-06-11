import {IGetAutomationUseCase} from "@/src/application/use-cases/automations/get-automation.use-case";
import {AutomationType, automationTypeSchema} from "@/drizzle/schema/automations";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetAutomationController = ReturnType<typeof getAutomationController>;

export const getAutomationController = (
    getAutomationUseCase: IGetAutomationUseCase
) => async (type: AutomationType | undefined) => {

    const {data: parsedType, error} = automationTypeSchema.safeParse(type);
    if (error) throw new InputParseError(`Invalid type! ${error}`);

    return getAutomationUseCase(parsedType);
}