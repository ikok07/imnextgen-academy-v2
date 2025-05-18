"use client"

import MuxPlayer from "@mux/mux-player-react"
import {Chapter, StreamTypes, ValueOf} from "@mux/playback-core";
import {cn} from "@/app/_utils/cn";
import MuxPlayerElement, {Tokens} from "@mux/mux-player";
import {useEffect, useRef} from "react";
import {useTheme} from "next-themes";

type MuxVideoPlayerProps = {
    className?: string,
    onTimeUpdate?: (currSeconds: number, totalSeconds: number) => void,
    chapters: Chapter[],
    streamType: ValueOf<StreamTypes> | 'll-live' | 'live:dvr' | 'll-live:dvr'
    playbackId: string,
    tokens: Tokens
}

export default function MuxVideoPlayer({className, onTimeUpdate, chapters, streamType, playbackId, tokens}: MuxVideoPlayerProps) {
    const player = useRef<MuxPlayerElement | null>(null);
    const {resolvedTheme} = useTheme();

    useEffect(() => {
        if (player.current) {
            player.current.addChapters(chapters);
        }
    }, [player.current]);

    return <div
        className={cn(
            "max-w-[50rem] w-[97%] md:mx-auto aspect-video rounded-lg shadow-md md:shadow-xl overflow-hidden",
            className
        )}
    >
        <MuxPlayer
            ref={player}
            className="w-full aspect-video"
            streamType={streamType}
            playbackId={playbackId}
            tokens={tokens}
            accentColor="hsl(var(--cta))"
            onTimeUpdate={() => {
                if (player.current && onTimeUpdate) {
                    onTimeUpdate(player.current.currentTime, player.current.duration)
                }
            }}
        />
    </div>
}