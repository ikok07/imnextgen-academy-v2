import {createModule} from "@evyweb/ioctopus";
import {ModulesRepository} from "@/src/infrastructure/repositories/media/modules/modules.repository";
import {DI_SYMBOLS} from "@/di/types/types";
import {getModulesUseCase} from "@/src/application/use-cases/media/modules/get-modules.use-case";
import {getModulesController} from "@/src/interface-adapters/controllers/media/modules/get-modules.controller";
import {getModuleByIdUseCase} from "@/src/application/use-cases/media/modules/get-module-by-id.use-case";
import {getModuleByIdController} from "@/src/interface-adapters/controllers/media/modules/get-module-by-id.controller";
import {getPaidModulesUseCase} from "@/src/application/use-cases/media/modules/get-paid-modules.use-case";
import {getPaidModulesController} from "@/src/interface-adapters/controllers/media/modules/get-paid-modules.controller";
import {
    getModulesByProductIdsUseCase
} from "@/src/application/use-cases/media/modules/get-modules-by-product-ids.use-case";
import {
    getModulesByProductIdsController
} from "@/src/interface-adapters/controllers/media/modules/get-modules-by-product-ids.controller";
import {createModuleUseCase} from "@/src/application/use-cases/media/modules/create-module.use-case";
import {createModuleController} from "@/src/interface-adapters/controllers/media/modules/create-module.controller";
import {updateModuleUseCase} from "@/src/application/use-cases/media/modules/update-module.use-case";
import {updateModuleController} from "@/src/interface-adapters/controllers/media/modules/update-module.controller";
import {deleteModuleUseCase} from "@/src/application/use-cases/media/modules/delete-module.use-case";
import {deleteModuleController} from "@/src/interface-adapters/controllers/media/modules/delete-module.controller";
import {
    deleteMultipleModulesController
} from "@/src/interface-adapters/controllers/media/modules/delete-multiple-modules.controller";
import {deleteMultipleModulesUseCase} from "@/src/application/use-cases/media/modules/delete-multiple-modules.use-case";

export function createClassroomModulesModule() {
    const classroomModulesModule = createModule();

    classroomModulesModule
        .bind(DI_SYMBOLS.IModulesRepository)
        .toClass(ModulesRepository);

    classroomModulesModule
        .bind(DI_SYMBOLS.IGetModulesUseCase)
        .toHigherOrderFunction(getModulesUseCase, [DI_SYMBOLS.IModulesRepository]);

    classroomModulesModule
        .bind(DI_SYMBOLS.IGetModulesController)
        .toHigherOrderFunction(getModulesController, [DI_SYMBOLS.IGetModulesUseCase]);

    classroomModulesModule
        .bind(DI_SYMBOLS.IGetModulesByProductIdsUseCase)
        .toHigherOrderFunction(getModulesByProductIdsUseCase, [DI_SYMBOLS.IModulesRepository]);

    classroomModulesModule
        .bind(DI_SYMBOLS.IGetModulesByProductIdsController)
        .toHigherOrderFunction(getModulesByProductIdsController, [DI_SYMBOLS.IGetModulesByProductIdsUseCase]);

    classroomModulesModule
        .bind(DI_SYMBOLS.IGetModuleByIdUseCase)
        .toHigherOrderFunction(getModuleByIdUseCase, [DI_SYMBOLS.IModulesRepository]);

    classroomModulesModule
        .bind(DI_SYMBOLS.IGetModuleByIdController)
        .toHigherOrderFunction(getModuleByIdController, [DI_SYMBOLS.IGetModuleByIdUseCase]);

    classroomModulesModule
        .bind(DI_SYMBOLS.IGetPaidModulesUseCase)
        .toHigherOrderFunction(getPaidModulesUseCase, [DI_SYMBOLS.IModulesRepository]);

    classroomModulesModule
        .bind(DI_SYMBOLS.IGetPaidModulesController)
        .toHigherOrderFunction(getPaidModulesController, [DI_SYMBOLS.IGetPaidModulesUseCase]);

    classroomModulesModule
        .bind(DI_SYMBOLS.ICreateModuleUseCase)
        .toHigherOrderFunction(createModuleUseCase, [DI_SYMBOLS.IModulesRepository]);

    classroomModulesModule
        .bind(DI_SYMBOLS.ICreateModuleController)
        .toHigherOrderFunction(createModuleController, [DI_SYMBOLS.ICreateModuleUseCase]);

    classroomModulesModule
        .bind(DI_SYMBOLS.IUpdateModuleUseCase)
        .toHigherOrderFunction(updateModuleUseCase, [DI_SYMBOLS.IModulesRepository]);

    classroomModulesModule
        .bind(DI_SYMBOLS.IUpdateModuleController)
        .toHigherOrderFunction(updateModuleController, [DI_SYMBOLS.IUpdateModuleUseCase]);

    classroomModulesModule
        .bind(DI_SYMBOLS.IDeleteModuleUseCase)
        .toHigherOrderFunction(deleteModuleUseCase, [DI_SYMBOLS.IModulesRepository]);

    classroomModulesModule
        .bind(DI_SYMBOLS.IDeleteModuleController)
        .toHigherOrderFunction(deleteModuleController, [DI_SYMBOLS.IDeleteModuleUseCase]);

    classroomModulesModule
        .bind(DI_SYMBOLS.IDeleteMultipleModulesUseCase)
        .toHigherOrderFunction(deleteMultipleModulesUseCase, [DI_SYMBOLS.IModulesRepository]);

    classroomModulesModule
        .bind(DI_SYMBOLS.IDeleteMultipleModulesController)
        .toHigherOrderFunction(deleteMultipleModulesController, [DI_SYMBOLS.IDeleteMultipleModulesUseCase]);

    return classroomModulesModule;
}