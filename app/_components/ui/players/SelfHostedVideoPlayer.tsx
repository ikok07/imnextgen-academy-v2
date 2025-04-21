"use client"

import Video from "next-video/player";
import {cn} from "@/app/_utils/cn";
import {useState} from "react";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoVideocamOff} from "react-icons/io5";
import {Card} from "@/app/_components/ui/shadcn/card";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import PlayerVideoError from "@/app/_components/ui/players/PlayerVideoError";

type SelfHostedVideoPlayerProps = {
    url: string,
    onTimeUpdate?: (currSeconds: number, totalSeconds: number) => void,
    className?: string
}

export default function SelfHostedVideoPlayer({url, onTimeUpdate, className}: SelfHostedVideoPlayerProps) {
    const {viewLoaded} = useViewLoaded();
    const [hasError, setHasError] = useState(false);

    if (!viewLoaded) return <Skeleton className={cn("max-w-[50rem] w-full mx-auto aspect-video")} />

    if (hasError) return <PlayerVideoError />

    return <div
        className={cn(
            "max-w-[50rem] w-[97%] md:mx-auto aspect-video player rounded-md shadow-md md:shadow-xl overflow-hidden",
            className
        )}
    >
        <Video
            src={url}
            onTimeUpdate={e => onTimeUpdate ? onTimeUpdate(e.currentTarget.currentTime, e.currentTarget.duration): {}}
            onError={(e) => {
                console.log(e);
                setHasError(true)
            }}
        />
    </div>
}