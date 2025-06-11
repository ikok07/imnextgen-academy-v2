import {IAutomationsRepository} from "@/src/application/repositories/automations/automations.repository.interface";
import {AutomationType} from "@/drizzle/schema/automations";

export type IGetAutomationUseCase = ReturnType<typeof getAutomationUseCase>;

export const getAutomationUseCase = (
    automationsRepository: IAutomationsRepository
) => async (type: AutomationType) => {
    return automationsRepository.getAutomation(type);
}