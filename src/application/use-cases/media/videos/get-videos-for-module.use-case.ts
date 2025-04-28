import {IVideosRepository} from "@/src/application/repositories/media/videos/videos.repository.interface";
import {Section, sectionsSchema} from "@/drizzle/schema/sections";
import {Video, videosSchema} from "@/drizzle/schema/videos";
import {VideoDescription, videoDescriptionsSchema} from "@/drizzle/schema/video_descriptions";
import {z} from "zod";

export type IGetVideosForModuleUseCase = ReturnType<typeof getVideosForModuleUseCase>;

export const videosForModuleResponseSchema = z.array(z.object({
    section: sectionsSchema,
    videos: z.array(videosSchema),
    descriptions: z.array(videoDescriptionsSchema)
}));

export type VideosForModuleResponse = z.infer<typeof videosForModuleResponseSchema>;

export const getVideosForModuleUseCase = (
    videosRepository: IVideosRepository
) => async (moduleId: string): Promise<VideosForModuleResponse> => {
    const rawVideosForModuleResults = await videosRepository.getVideosForModule(moduleId);

    const sectionMap = new Map<string, {section: Section, videos: Video[], descriptions: VideoDescription[]}>();

    rawVideosForModuleResults.forEach(row => {
        const {section, video, description} = row;

        if (sectionMap.has(section.id)) {
            const item = sectionMap.get(section.id);
            item?.videos.push(video);
            item?.descriptions.push(description);
            return;
        }

        sectionMap.set(section.id, {
            section,
            videos: [row.video],
            descriptions: [description]
        });
    });

    return Array.from(sectionMap.values());
}