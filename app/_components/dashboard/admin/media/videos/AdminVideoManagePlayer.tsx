"use client"

import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getSignedTokens} from "@/app/dashboard/actions";
import {Tokens} from "@mux/mux-player";
import {useMemo} from "react";
import MuxVideoPlayer from "@/app/_components/ui/players/MuxVideoPlayer";
import {useManageVideo} from "@/app/_providers/admin/AdminManageVideoProvider";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoVideocam, IoVideocamOff} from "react-icons/io5";
import SelfHostedVideoPlayer from "@/app/_components/ui/players/SelfHostedVideoPlayer";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";

export default function AdminVideoManagePlayer() {
    const {viewLoaded} = useViewLoaded();
    const {video, editMode, videoFile, setVideoFile} = useManageVideo();

    const {data: signedTokensQuery, isLoading: isGettingSignedTokens} = useErrorQuery({
        queryFn: () => getSignedTokens(video?.playbackId ?? undefined, ["video", "thumbnail"]),
        queryKey: [`signed-tokens`, video?.playbackId],
        enabled: !!video?.playbackId
    });

    const tokens: Tokens | undefined  = useMemo(() => {
        if (signedTokensQuery?.success) {
            return {
                playback: signedTokensQuery.value.get("video"),
                thumbnail: signedTokensQuery.value.get("thumbnail")
            };
        }
    }, [signedTokensQuery]);

    const uploadedVideo = useMemo(() => {
        if (!videoFile) return;
        return <SelfHostedVideoPlayer url={URL.createObjectURL(videoFile)} className="w-full aspect-video" />
    }, [videoFile]);

    if (!viewLoaded) {
        return <Skeleton className="w-full aspect-video" />
    }

    if (editMode) {
        return <div className="w-full h-full grid grid-rows-[1fr_auto] items-center gap-3">
            <input
                type="file"
                accept=".mp4,.mpeg"
                id="module-video"
                className="hidden"
                onChange={e => {
                    const file = e.target.files ? e.target.files[0] : null;
                    if (!file || !["video/mp4", "video/mpeg"].includes(file.type)) return;
                    setVideoFile(file);
                }}
            />
            {!videoFile && <label htmlFor="module-video" className={`cursor-pointer w-full aspect-video hover:opacity-80 transition-all duration-200`}>
                <div className="h-full grid place-content-center border border-border rounded-lg">
                    <PrimaryErrorMessage
                        Icon={IoVideocam}
                        title="Качване на видео"
                        message="Натисни тук, за да качиш ново видео"
                    />
                </div>
            </label>}
            {videoFile && <div className="flex flex-col items-center">
                {uploadedVideo}
                <button onClick={() => setVideoFile(null)}><p className="mt-2 text-sm font-semibold hover:text-cta">Премахване</p></button>
            </div>}
        </div>
    }

    if ((video?.playbackId && tokens) || isGettingSignedTokens) {
        return <MuxVideoPlayer streamType="on-demand" playbackId={video?.playbackId ?? ""} tokens={tokens} isLoading={isGettingSignedTokens} chapters={[]} className="w-full aspect-video"/>
    } else {
        return <div className="w-full aspect-video grid place-content-center border border-border rounded-lg">
            <PrimaryErrorMessage
                Icon={IoVideocamOff}
                title="Няма налично видео"
                message="За избраното видео не е качено видео."
            />
        </div>
    }
}