"use server"

import {createServerAction, ServerActionError} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";
import {VideoInsert} from "@/drizzle/schema/videos";
import {VideoResourceInsert} from "@/drizzle/schema/video_resources";

export const getVideoById = createServerAction((videoId: string) => {
    return getInjection("IGetVideoByIdController")(videoId);
});

export const getVideoDescriptionById = createServerAction((id: string | undefined) => {
    return getInjection("IGetVideoDescriptionByIdController")(id);
});

export const updateVideo = createServerAction(async (
    uploadId: string | undefined,
    userId: string | undefined,
    moduleId: string | undefined,
    videoId: string | undefined,
    data: Partial<VideoInsert & {descriptionLabel?: string, descriptionMarkdown?: string}>
) => {
    let assetId: string | undefined;
    let playbackId: string | undefined;

    if (uploadId) {
        const uploadData = await getInjection("IGetUploadDataController")(uploadId);
        const asset = await getInjection("IGetAssetByIdController")(uploadData.asset_id);
        assetId = asset.id;
        playbackId = asset.playback_ids?.length ? asset.playback_ids[0].id : undefined;
    }

    let descriptionId = data?.description_id;
    if (!descriptionId) {
        if (!data.descriptionLabel || !data.descriptionMarkdown) throw new ServerActionError("No description label or markdown provided!");
        const newDescription = await getInjection("ICreateVideoDescriptionController")({
            label: data.descriptionLabel,
            markdown: data.descriptionMarkdown
        });
        descriptionId = newDescription.id;
    } else {
        await getInjection("IUpdateVideoDescriptionController")(descriptionId, {
            label: data.descriptionLabel,
            markdown: data.descriptionMarkdown
        });
    }

    const updatedVideo = await getInjection("IUpdateVideoController")(
        moduleId,
        videoId,
        {...data, description_id: descriptionId, playbackId}
    );

    if (assetId) {
        await getInjection("IUpdateAssetMetadataController")(assetId, {
            title: updatedVideo.title,
            creator_id: userId,
            external_id: updatedVideo.id
        });
    }
});

export const uploadResource = createServerAction(async (data: Partial<VideoResourceInsert>) => {
   await getInjection("ICreateResourceController")(data);
});

export const deleteMultipleResources = createServerAction(async (resourceIds: string[], urls: string[]) => {
    await getInjection("IDeleteMultipleResourcesController")(resourceIds);

    for (const url of urls) {
        const searchParams = new URLSearchParams(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`);
        await getInjection("IDeleteFileController")({
            bucket: process.env.NEXT_PUBLIC_R2_VIDEO_RESOURCES_BUCKET!,
            key: searchParams.get("path") ?? undefined
        });
    }
});