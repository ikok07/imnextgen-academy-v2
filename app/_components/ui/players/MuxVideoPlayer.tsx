"use client"

import MuxPlayer from "@mux/mux-player-react"
import {Chapter, StreamTypes, ValueOf} from "@mux/playback-core";
import {cn} from "@/app/_utils/cn";
import MuxPlayerElement, {Tokens} from "@mux/mux-player";
import {useRef, useState} from "react";
import PlayerVideoError from "@/app/_components/ui/players/PlayerVideoError";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";

type MuxVideoPlayerProps = {
    className?: string,
    skeletonClassName?: string,
    onTimeUpdate?: (currSeconds: number, totalSeconds: number) => void,
    isLoading?: boolean,
    hasError?: boolean,
    tokens: Tokens | undefined,
    chapters: Chapter[],
    streamType: ValueOf<StreamTypes> | 'll-live' | 'live:dvr' | 'll-live:dvr'
    playbackId: string,
}

export default function MuxVideoPlayer({className, skeletonClassName, onTimeUpdate, isLoading, hasError, tokens, chapters, streamType, playbackId}: MuxVideoPlayerProps) {
    const player = useRef<MuxPlayerElement | null>(null);
    const [isInvalid, setIsInvalid] = useState(false);

    // You need to get the tokens first in order to render the player
    if (isLoading) return <Skeleton className={cn("max-w-[50rem] w-full mx-auto aspect-video", skeletonClassName)} />

    if (isInvalid || hasError) return <PlayerVideoError />

    return <div
        className={cn(
            "max-w-[50rem] w-[97%] md:mx-auto aspect-video rounded-lg shadow-md md:shadow-xl overflow-hidden",
            className
        )}
    >
        <MuxPlayer
            ref={player}
            className={`w-full aspect-video`}
            streamType={streamType}
            playbackId={playbackId}
            tokens={tokens}
            accentColor="hsl(var(--cta))"
            onError={() => setIsInvalid(true)}
            onTimeUpdate={() => {
                if (player.current && onTimeUpdate) {
                    onTimeUpdate(player.current.currentTime, player.current.duration)
                }
            }}
            onLoadedData={() => {
                if (player.current) {
                    player.current.addChapters(chapters);
                }
            }}
        />
    </div>
}