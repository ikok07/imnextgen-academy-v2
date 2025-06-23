import {GetUploadLinkOptions, IVideosService} from "@/src/application/services/media/videos/videos.service.interface";

export type IGetUploadLinkUseCase = ReturnType<typeof getUploadLinkUseCase>;

export const getUploadLinkUseCase = (
    videosService: IVideosService
) => async (opts: GetUploadLinkOptions) => {
    return videosService.getUploadLink(opts);
}