import { IS3StorageService } from "@/src/application/services/storage/s3-storage.service.interface"
import { IUploadSmallFileUseCase } from "@/src/application/use-cases/storage/upload-small-file.use-case"
import { IDeleteFileController } from "@/src/interface-adapters/controllers/storage/delete-file.controller"
import { IUploadSmallFileController } from "@/src/interface-adapters/controllers/storage/upload-small-file.controller"
import {IDeleteFileUseCase} from "@/src/application/use-cases/storage/delete-file.use-case";
import { IDeleteMultipleFilesController } from "@/src/interface-adapters/controllers/storage/delete-multiple-files.controller";
import {IDeleteMultipleFilesUseCase} from "@/src/application/use-cases/storage/delete-multiple-files.use-case";
import {IGetUploadLinkUseCase} from "@/src/application/use-cases/storage/get-upload-link.use-case";
import {IGetUploadLinkController} from "@/src/interface-adapters/controllers/storage/get-upload-link.controller";

export const STORAGE_SYMBOLS = {
    IS3StorageService: Symbol.for("IS3StorageService"),

    IGetFileUploadLinkUseCase: Symbol.for("IGetFileUploadLinkUseCase"),
    IGetFileUploadLinkController: Symbol.for("IGetFileUploadLinkController"),

    IUploadSmallFileUseCase: Symbol.for("IUploadSmallFileUseCase"),
    IUploadSmallFileController: Symbol.for("IUploadSmallFileController"),

    IDeleteFileUseCase: Symbol.for("IDeleteFileUseCase"),
    IDeleteFileController: Symbol.for("IDeleteFileController"),

    IDeleteMultipleFilesUseCase: Symbol.for("IDeleteMultipleFilesUseCase"),
    IDeleteMultipleFilesController: Symbol.for("IDeleteMultipleFilesController")

}

export interface STORAGE_RETURN_TYPES {
    IS3StorageService: IS3StorageService,

    IGetFileUploadLinkUseCase: IGetUploadLinkUseCase,
    IGetFileUploadLinkController: IGetUploadLinkController,

    IUploadSmallFileUseCase: IUploadSmallFileUseCase,
    IUploadSmallFileController: IUploadSmallFileController,

    IDeleteFileUseCase: IDeleteFileUseCase,
    IDeleteFileController: IDeleteFileController,

    IDeleteMultipleFilesUseCase: IDeleteMultipleFilesUseCase,
    IDeleteMultipleFilesController: IDeleteMultipleFilesController
}


