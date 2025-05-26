import {IVideosRepository} from "@/src/application/repositories/media/videos/videos.repository.interface";
import {Section, sectionsSchema} from "@/drizzle/schema/sections";
import {Video, videosSchema} from "@/drizzle/schema/videos";
import {VideoDescription, videoDescriptionsSchema} from "@/drizzle/schema/video_descriptions";
import {z} from "zod";
import {videoChapterSchema} from "@/drizzle/schema/video_chapters";
import {videoResourceSchema} from "@/drizzle/schema/video_resources";

export type IGetVideosForModuleUseCase = ReturnType<typeof getVideosForModuleUseCase>;

export const videosForModuleResponseItemSchema = z.object({
    section: sectionsSchema,
    videos: z.array(videosSchema),
    descriptions: z.array(videoDescriptionsSchema),
    chapters: z.array(videoChapterSchema),
    resources: z.array(videoResourceSchema)
});
export const videosForModuleResponseSchema = z.array(videosForModuleResponseItemSchema);

export type VideosForModuleResponseItem = z.infer<typeof videosForModuleResponseItemSchema>;
export type VideosForModuleResponse = z.infer<typeof videosForModuleResponseSchema>;

export const getVideosForModuleUseCase = (
    videosRepository: IVideosRepository
) => async (moduleId: string): Promise<VideosForModuleResponse> => {
    const rawVideosForModuleResults = await videosRepository.getVideosForModule(moduleId);

    const sectionMap = new Map<string, VideosForModuleResponseItem>();

    rawVideosForModuleResults.forEach(row => {
        const {section, video, description, chapter, resource} = row;

        if (sectionMap.has(section.id)) {
            const item = sectionMap.get(section.id);
            if (!item?.videos.find(v => v.id === video.id)) item?.videos.push(video);
            if (!item?.descriptions.find(d => d.id === description?.id) && description) item?.descriptions.push(description);
            if (!item?.chapters.find(c => c.id === chapter?.id) && chapter) item?.chapters?.push(chapter);
            if (!item?.resources.find(r => r.id === resource?.id) && resource) item?.resources?.push(resource)
            return;
        }

        sectionMap.set(section.id, {
            section,
            videos: [row.video],
            descriptions: description ? [description] : [],
            chapters: chapter ? [chapter] : [],
            resources: resource? [resource] : []
        });
    });

    return Array.from(sectionMap.values());
}