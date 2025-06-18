"use server"

import {createServerAction, ServerActionError} from "@/app/_utils/createServerAction";
import {z} from "zod";
import {moduleAccessEnumSchema} from "@/drizzle/schema/modules";
import {getInjection} from "@/di/container";
import {S3StorageError} from "@/src/entities/errors/storage/s3-storage";

export const uploadModule = createServerAction(async (opts:{imgFileBuffer: Uint8Array | undefined | null, fileName: string | undefined | null,
    fileType: string | undefined | null, title: string | undefined | null, description: string | undefined | null,
    accessLevel: z.infer<typeof moduleAccessEnumSchema> | undefined | null
}) => {
    try {
        const imgURI = await getInjection("IUploadSmallFileController")({
            bucket: "asd",
            key: opts.fileName ?? undefined,
            body: opts.imgFileBuffer ? Buffer.from(opts.imgFileBuffer) : undefined,
            contentType: opts.fileType ?? undefined
        });
    } catch (e) {
        if (e instanceof S3StorageError) {
            throw new ServerActionError({id: "upload-failed", message: "Снимката не може да бъде качена!"});
        }
        throw e;
    }

});