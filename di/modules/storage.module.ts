import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {S3StorageService} from "@/src/infrastructure/services/storage/s3-storage.service";
import {uploadSmallFileUseCase} from "@/src/application/use-cases/storage/upload-small-file.use-case";
import { uploadSmallFileController } from "@/src/interface-adapters/controllers/storage/upload-small-file.controller";
import {deleteFileUseCase} from "@/src/application/use-cases/storage/delete-file.use-case";
import {deleteFileController} from "@/src/interface-adapters/controllers/storage/delete-file.controller";
import {
    deleteMultipleFilesController
} from "@/src/interface-adapters/controllers/storage/delete-multiple-files.controller";
import {deleteMultipleFilesUseCase} from "@/src/application/use-cases/storage/delete-multiple-files.use-case";
import {getUploadLinkUseCase} from "@/src/application/use-cases/storage/get-upload-link.use-case";
import {getUploadLinkController} from "@/src/interface-adapters/controllers/storage/get-upload-link.controller";

export function createStorageModule() {
    const storageModule = createModule();

    storageModule
        .bind(DI_SYMBOLS.IS3StorageService)
        .toClass(S3StorageService);

    storageModule
        .bind(DI_SYMBOLS.IGetFileUploadLinkUseCase)
        .toHigherOrderFunction(getUploadLinkUseCase, [DI_SYMBOLS.IS3StorageService]);

    storageModule
        .bind(DI_SYMBOLS.IGetFileUploadLinkController)
        .toHigherOrderFunction(getUploadLinkController, [DI_SYMBOLS.IGetFileUploadLinkUseCase]);

    storageModule
        .bind(DI_SYMBOLS.IUploadSmallFileUseCase)
        .toHigherOrderFunction(uploadSmallFileUseCase, [DI_SYMBOLS.IS3StorageService]);

    storageModule
        .bind(DI_SYMBOLS.IUploadSmallFileController)
        .toHigherOrderFunction(uploadSmallFileController, [DI_SYMBOLS.IUploadSmallFileUseCase]);

    storageModule
        .bind(DI_SYMBOLS.IDeleteFileUseCase)
        .toHigherOrderFunction(deleteFileUseCase, [DI_SYMBOLS.IS3StorageService]);

    storageModule
        .bind(DI_SYMBOLS.IDeleteFileController)
        .toHigherOrderFunction(deleteFileController, [DI_SYMBOLS.IDeleteFileUseCase]);

    storageModule
        .bind(DI_SYMBOLS.IDeleteMultipleFilesUseCase)
        .toHigherOrderFunction(deleteMultipleFilesUseCase, [DI_SYMBOLS.IS3StorageService]);

    storageModule
        .bind(DI_SYMBOLS.IDeleteMultipleFilesController)
        .toHigherOrderFunction(deleteMultipleFilesController, [DI_SYMBOLS.IDeleteMultipleFilesUseCase]);

    return storageModule;
}