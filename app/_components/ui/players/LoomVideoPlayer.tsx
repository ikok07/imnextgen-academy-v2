import {cn} from "@/app/_utils/cn";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import PlayerVideoError from "@/app/_components/ui/players/PlayerVideoError";
import {usePlayer} from "@/app/_hooks/players/usePlayer";

type LoomVideoPlayerProps = {
    videoUrl: string,
    className?: string,
    playerClassName?: string,
    skeletonClassName?: string
}

export default function LoomVideoPlayer({videoUrl, className, playerClassName, skeletonClassName}: LoomVideoPlayerProps) {
    const {isLoading, setIsLoading, isInvalid} = usePlayer({videoUrl});
    if (isInvalid) return <PlayerVideoError />

    return <div
        className={cn(
            className
        )}
    >
        <iframe
            src={`${videoUrl}&hideEmbedTopBar=true`}
            className={cn(
                `${isLoading && "hidden"} max-w-[50rem] w-[97%] md:mx-auto aspect-video rounded-sm shadow-md md:shadow-xl`,
                playerClassName
            )}
            onLoad={() => setIsLoading(false)}
        />
        {isLoading && <Skeleton className={cn("max-w-[50rem] w-full mx-auto aspect-video", skeletonClassName)} />}
    </div>
}