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
        if (opts.imgFileBuffer && opts.imgFileBuffer.length > 300_000) throw new ServerActionError({id: "image-size", message: "Снимката не трябва да надвишава 300kb!"});
        const imgURI = await getInjection("IUploadSmallFileController")({
            bucket: process.env.R2_MODULES_IMAGES_BUCKET,
            key: opts.fileName ? `${Math.floor(Date.now() / 1000)}-${opts.fileName}` : undefined,
            body: opts.imgFileBuffer ? Buffer.from(opts.imgFileBuffer) : undefined,
            contentType: opts.fileType ?? undefined
        });

        const allModules = (await getInjection("IGetModulesController")()).sort((a, b) => a.order_number - b.order_number);

        await getInjection("ICreateModuleController")({
            title: opts.title ?? undefined,
            description: opts.description ?? undefined,
            access: opts.accessLevel ?? undefined,
            order_number: allModules.length > 0 ? allModules[allModules.length - 1].order_number + 1 : 0,
            image_url: imgURI
        })
    } catch (e) {
        if (e instanceof S3StorageError) {
            console.error(e);
            throw new ServerActionError({id: "upload-failed", message: "Снимката не може да бъде качена!"});
        }
        throw e;
    }
});

export const deleteModules = createServerAction(async (moduleIds: string[]) => {
    const modules = await getInjection("IGetModulesByIdsController")(moduleIds);
    const imagePaths = modules.filter(m => !!m.image_url && new URLSearchParams(`${process.env.NEXT_PUBLIC_BASE_URL}${m.image_url}`).get("path")).map(m => new URLSearchParams(m.image_url!).get("path")!);

    await getInjection("IDeleteMultipleModulesController")(moduleIds);

    if (imagePaths.length > 0) {
        await getInjection("IDeleteMultipleFilesController")({
            bucket: process.env.R2_MODULES_IMAGES_BUCKET,
            keys: imagePaths
        });
    }
});

export const getVideoDescriptions = createServerAction(() => {
    return getInjection("IGetVideoDescriptionsController")();
});

export const getUploadVideoUrl = createServerAction(() => {
    return getInjection("IGetUploadLinkController")({
        maxResolutionTier: "1080p",
        videoQuality: "basic",
        playbackPolicy: ["signed"]
    });
});

export const deleteVideo = createServerAction((assetId: string | undefined) => {
    return getInjection("IDeleteVideoServiceVideoController")(assetId);
});