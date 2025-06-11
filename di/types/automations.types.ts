import {IAutomationsRepository} from "@/src/application/repositories/automations/automations.repository.interface";
import { IGetAutomationUseCase } from "@/src/application/use-cases/automations/get-automation.use-case";
import {IGetAutomationController} from "@/src/interface-adapters/controllers/automations/get-automation.controller";

export const AUTOMATIONS_SYMBOLS = {
    IAutomationsRepository: Symbol.for("IAutomationsRepository"),

    IGetAutomationUseCase: Symbol.for('IGetAutomationUseCase'),
    IGetAutomationController: Symbol.for("IGetAutomationController"),
}

export interface AUTOMATIONS_RETURN_TYPES {
    IAutomationsRepository: IAutomationsRepository,

    IGetAutomationUseCase: IGetAutomationUseCase,
    IGetAutomationController: IGetAutomationController
}


