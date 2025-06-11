import {
    IStartSalesMeetingAutomationUseCase
} from "@/src/application/use-cases/automations/start-sales-meeting-automation.use-case";
import {
    StartSalesMeetingOptions,
    startSalesMeetingOptionsSchema
} from "@/src/application/services/automations/automations.service.interface";
import {InputParseError} from "@/src/entities/errors/common";
import {IGetAutomationUseCase} from "@/src/application/use-cases/automations/get-automation.use-case";

export type IStartSalesMeetingAutomationController = ReturnType<typeof startSalesMeetingAutomationController>;

export const startSalesMeetingAutomationController = (
    startSalesMeetingAutomationUseCase: IStartSalesMeetingAutomationUseCase,
    getAutomationUseCase: IGetAutomationUseCase
) => async (opts: Partial<Omit<StartSalesMeetingOptions, "automationUrl">>) => {

    const {data: parsedOpts, error} = startSalesMeetingOptionsSchema.omit({automationUrl: true}).safeParse(opts);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    const automation = await getAutomationUseCase("sales-meeting-booked");

    return startSalesMeetingAutomationUseCase({...parsedOpts, automationUrl: automation.url});
}