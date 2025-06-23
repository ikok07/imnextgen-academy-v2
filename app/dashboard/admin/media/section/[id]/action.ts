"use server"

import {createServerAction, ServerActionError} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";
import {SectionInsert} from "@/drizzle/schema/sections";
import {VideoInsert} from "@/drizzle/schema/videos";

export const getSectionById = createServerAction((sectionId: string | undefined) => {
    return getInjection("IGetSectionByIdController")(sectionId);
});

export const updateSection = createServerAction((sectionId: string | undefined, moduleId: string | undefined, data: Partial<SectionInsert>) => {
    return getInjection("IUpdateSectionController")(sectionId, moduleId, data);
});

export const uploadVideo = createServerAction(async (moduleId: string | undefined, uploadId: string | undefined, userId: string | undefined, video: Partial<Omit<Omit<VideoInsert, "description_id">, "playbackId">> & {descriptionId?: string, descriptionLabel?: string, descriptionMarkdown?: string}) => {
    let descriptionId = video?.descriptionId;

    if (!descriptionId) {
        if (!video.descriptionLabel || !video.descriptionMarkdown) throw new ServerActionError("No description title or markdown provided!");
        const newDescription = await getInjection("ICreateVideoDescriptionController")({
            label: video.descriptionLabel,
            markdown: video.descriptionMarkdown
        });
        console.log(newDescription);
        descriptionId = newDescription.id;
    }

    console.log(descriptionId);
    const uploadData = await getInjection("IGetUploadDataController")(uploadId);
    const asset = await getInjection("IGetAssetByIdController")(uploadData.asset_id);

    const createdVideo = await getInjection("ICreateVideoController")(moduleId, {
        ...video,
        description_id: descriptionId,
        playbackId: asset.playback_ids?.length ? asset.playback_ids[0].id : undefined
    });
    console.log(createdVideo);

    await getInjection("IUpdateAssetMetadataController")(uploadData.asset_id, {
        title: createdVideo.title,
        creator_id: userId,
        external_id: createdVideo.id
    });
})