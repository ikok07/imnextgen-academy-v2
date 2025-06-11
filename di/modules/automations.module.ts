import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {AutomationsRepository} from "@/src/infrastructure/repositories/automations/automations.repository";
import {getAutomationUseCase} from "@/src/application/use-cases/automations/get-automation.use-case";
import {
    getAutomationController,
    IGetAutomationController
} from "@/src/interface-adapters/controllers/automations/get-automation.controller";

export function createAutomationsModule() {
    const automationsModule = createModule();

    automationsModule
        .bind(DI_SYMBOLS.IAutomationsRepository)
        .toClass(AutomationsRepository);

    automationsModule
        .bind(DI_SYMBOLS.IGetAutomationUseCase)
        .toHigherOrderFunction(getAutomationUseCase, [DI_SYMBOLS.IAutomationsRepository]);

    automationsModule
        .bind(DI_SYMBOLS.IGetAutomationController)
        .toHigherOrderFunction(getAutomationController, [DI_SYMBOLS.IGetAutomationUseCase]);

    return automationsModule;
}