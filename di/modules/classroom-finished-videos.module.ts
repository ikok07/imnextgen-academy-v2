import {createModule} from "@evyweb/ioctopus";
import {FinishedVideosRepository} from "@/src/infrastructure/repositories/media/videos/finished-videos.repository";
import {DI_SYMBOLS} from "@/di/types/types";
import {getFinishedVideosUseCase} from "@/src/application/use-cases/media/videos/get-finished-videos.use-case";
import {
    getFinishedVideosController
} from "@/src/interface-adapters/controllers/media/videos/get-finished-videos.controller";

export function createClassroomFinishedVideosModule() {
    const classroomFinishedVideosModule = createModule();

    classroomFinishedVideosModule
        .bind(DI_SYMBOLS.IFinishedVideosRepository)
        .toClass(FinishedVideosRepository);

    classroomFinishedVideosModule
        .bind(DI_SYMBOLS.IGetFinishedVideosUseCase)
        .toHigherOrderFunction(getFinishedVideosUseCase, [DI_SYMBOLS.IFinishedVideosRepository]);

    classroomFinishedVideosModule
        .bind(DI_SYMBOLS.IGetFinishedVideosController)
        .toHigherOrderFunction(getFinishedVideosController, [DI_SYMBOLS.IGetFinishedVideosUseCase]);

    return classroomFinishedVideosModule;
}