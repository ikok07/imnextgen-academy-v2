import {IAutomationsRepository} from "@/src/application/repositories/automations/automations.repository.interface";
import { IGetAutomationUseCase } from "@/src/application/use-cases/automations/get-automation.use-case";
import {IGetAutomationController} from "@/src/interface-adapters/controllers/automations/get-automation.controller";
import {
    IStartSalesMeetingAutomationController
} from "@/src/interface-adapters/controllers/automations/start-sales-meeting-automation.controller";
import {
    IStartSalesMeetingAutomationUseCase
} from "@/src/application/use-cases/automations/start-sales-meeting-automation.use-case";

export const AUTOMATIONS_SYMBOLS = {
    IAutomationsRepository: Symbol.for("IAutomationsRepository"),
    IAutomationsService: Symbol.for("IAutomationsService"),

    IGetAutomationUseCase: Symbol.for('IGetAutomationUseCase'),
    IGetAutomationController: Symbol.for("IGetAutomationController"),

    IStartSalesMeetingAutomationUseCase: Symbol.for("IStartSalesMeetingAutomationUseCase"),
    IStartSalesMeetingAutomationController: Symbol.for("IStartSalesMeetingAutomationController")
}

export interface AUTOMATIONS_RETURN_TYPES {
    IAutomationsRepository: IAutomationsRepository,

    IGetAutomationUseCase: IGetAutomationUseCase,
    IGetAutomationController: IGetAutomationController,

    IStartSalesMeetingAutomationUseCase: IStartSalesMeetingAutomationUseCase,
    IStartSalesMeetingAutomationController: IStartSalesMeetingAutomationController
}


