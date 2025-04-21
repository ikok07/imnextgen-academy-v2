import {cn} from "@/app/_utils/cn";
import {useEffect, useState} from "react";
import PlayerVideoError from "@/app/_components/ui/players/PlayerVideoError";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import {usePlayer} from "@/app/_hooks/players/usePlayer";

type VimeoVideoPlayerProps = {
    videoUrl: string,
    className?: string,
    playerClassName?: string,
    skeletonClassName?: string
}

export default function VimeoVideoPlayer({videoUrl, className, playerClassName, skeletonClassName}: VimeoVideoPlayerProps) {
    const {isLoading, setIsLoading, isInvalid} = usePlayer({videoUrl});

    if (isInvalid) return <PlayerVideoError />

    return <div
        className={cn(
            "max-w-[50rem] w-[97%] md:mx-auto aspect-video rounded-sm shadow-md md:shadow-xl overflow-hidden",
            className
        )}
    >
        <iframe
            src={videoUrl}
            className={cn(
                "w-full h-full focus:outline-transparent",
                playerClassName
            )}
            onLoad={() => setIsLoading(false)}
        />
        {isLoading && <Skeleton className={cn("max-w-[50rem] w-full mx-auto aspect-video", skeletonClassName)} />}
        <script src="https://player.vimeo.com/api/player.js" />
    </div>
}