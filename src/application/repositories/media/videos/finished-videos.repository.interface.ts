import {FinishedVideo} from "@/drizzle/schema/finished_videos";

export interface IFinishedVideosRepository {
    getFinishedVideosForModule(moduleId: string, userId: string): Promise<{finishedVideos: FinishedVideo[], percentage: number}>
}