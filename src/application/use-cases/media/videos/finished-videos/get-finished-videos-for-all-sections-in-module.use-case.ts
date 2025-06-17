import {
    FinishedVideosForAllSectionsResponse,
    IFinishedVideosRepository
} from "@/src/application/repositories/media/videos/finished-videos.repository.interface";

export type IGetFinishedVideosForAllSectionsInModuleUseCase = ReturnType<typeof getFinishedVideosForAllSectionsInModuleUseCase>;

export const getFinishedVideosForAllSectionsInModuleUseCase = (
    finishedVideosRepository: IFinishedVideosRepository
) => async (moduleId: string, userId: string) => {
    const rawResponse = await finishedVideosRepository.getFinishedVideosForAllSectionsInModule(moduleId, userId);

    if (rawResponse.length === 0) return { sections: [] };

    const finishedVideosForAllSections: FinishedVideosForAllSectionsResponse = {
        sections: Array.from(new Set(rawResponse.map(r => r.section.id))).map(id => ({
            id,
            finishedVideos: [],
            percentage: 0
        }))
    };

    // Insert the full finished videos
    for (const result of rawResponse) {
        const section = finishedVideosForAllSections.sections.find(s => s.id === result.section.id)!;
        section.finishedVideos.push({...result.finishedVideo, ...result.video});
    }

    // Calculate the percentage
    for (const section of finishedVideosForAllSections.sections) {
        const sampleResult = rawResponse.find(item => item.section.id === section.id)!;
        const totalVideosInSection = sampleResult.videosCount;
        section.percentage = totalVideosInSection > 0 ? Math.round((section.finishedVideos.length / totalVideosInSection) * 100) : 0;
    }

    return finishedVideosForAllSections;
}