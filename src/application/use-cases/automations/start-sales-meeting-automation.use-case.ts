import {
    IAutomationsService,
    StartSalesMeetingOptions
} from "@/src/application/services/automations/automations.service.interface";

export type IStartSalesMeetingAutomationUseCase = ReturnType<typeof startSalesMeetingAutomationUseCase>;

export const startSalesMeetingAutomationUseCase = (
    automationsService: IAutomationsService
) => async (opts: StartSalesMeetingOptions) => {
    return automationsService.startSalesMeetingAutomation(opts);
}