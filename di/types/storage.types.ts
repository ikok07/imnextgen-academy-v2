import { IS3StorageService } from "@/src/application/services/storage/s3-storage.service.interface"
import { IUploadSmallFileUseCase } from "@/src/application/use-cases/storage/upload-small-file.use-case"
import { IDeleteFileController } from "@/src/interface-adapters/controllers/storage/delete-file.controller"
import { IUploadSmallFileController } from "@/src/interface-adapters/controllers/storage/upload-small-file.controller"
import {IDeleteFileUseCase} from "@/src/application/use-cases/storage/delete-file.use-case";

export const STORAGE_SYMBOLS = {
    IS3StorageService: Symbol.for("IS3StorageService"),

    IUploadSmallFileUseCase: Symbol.for("IUploadSmallFileUseCase"),
    IUploadSmallFileController: Symbol.for("IUploadSmallFileController"),

    IDeleteFileUseCase: Symbol.for("IDeleteFileUseCase"),
    IDeleteFileController: Symbol.for("IDeleteFileController")
}

export interface STORAGE_RETURN_TYPES {
    IS3StorageService: IS3StorageService,

    IUploadSmallFileUseCase: IUploadSmallFileUseCase,
    IUploadSmallFileController: IUploadSmallFileController,

    IDeleteFileUseCase: IDeleteFileUseCase,
    IDeleteFileController: IDeleteFileController
}


