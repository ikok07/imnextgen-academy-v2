import {createModule} from "@evyweb/ioctopus";
import {ModulesRepository} from "@/src/infrastructure/repositories/media/modules.repository";
import {DI_SYMBOLS} from "@/di/types/types";
import {getModulesUseCase} from "@/src/application/use-cases/media/modules/get-modules.use-case";
import {getModulesController} from "@/src/interface-adapters/controllers/media/modules/get-modules.controller";
import {getModuleByIdUseCase} from "@/src/application/use-cases/media/modules/get-module-by-id.use-case";
import {getModuleByIdController} from "@/src/interface-adapters/controllers/media/modules/get-module-by-id.controller";

export function createClassroomModulesModule() {
    const classroomModules = createModule();

    classroomModules
        .bind(DI_SYMBOLS.IModulesRepository)
        .toClass(ModulesRepository);

    classroomModules
        .bind(DI_SYMBOLS.IGetModulesUseCase)
        .toHigherOrderFunction(getModulesUseCase, [DI_SYMBOLS.IModulesRepository]);

    classroomModules
        .bind(DI_SYMBOLS.IGetModulesController)
        .toHigherOrderFunction(getModulesController, [DI_SYMBOLS.IGetModulesUseCase]);

    classroomModules
        .bind(DI_SYMBOLS.IGetModuleByIdUseCase)
        .toHigherOrderFunction(getModuleByIdUseCase, [DI_SYMBOLS.IModulesRepository]);

    classroomModules
        .bind(DI_SYMBOLS.IGetModuleByIdController)
        .toHigherOrderFunction(getModuleByIdController, [DI_SYMBOLS.IGetModuleByIdUseCase]);

    return classroomModules
}