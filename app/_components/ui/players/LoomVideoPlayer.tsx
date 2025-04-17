import {cn} from "@/app/_utils/cn";
import {useEffect, useState} from "react";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoVideocamOff} from "react-icons/io5";
import {Card} from "@/app/_components/ui/shadcn/card";

type LoomVideoPlayerProps = {
    videoUrl: string,
    className?: string,
    playerClassName?: string,
    skeletonClassName?: string
}

export default function LoomVideoPlayer({videoUrl, className, playerClassName, skeletonClassName}: LoomVideoPlayerProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isInvalid, setIsInvalid] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setIsInvalid(false);
    }, [videoUrl]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isLoading) setIsInvalid(true);
        }, 1000 * 10) // 10 seconds
        return () => {
            clearTimeout(timeout);
        }
    }, [isLoading]);

    if (isInvalid) return <Card className="max-w-[50rem] w-[97%] md:mx-auto aspect-video grid place-content-center"><PrimaryErrorMessage Icon={IoVideocamOff} message="Видеото не може да бъде заредено!" title="Възникна грешка" /></Card>

    return <div
        className={cn(
            className
        )}
        onLoad={() => setIsLoading(false)}
    >
        <iframe
            src={`${videoUrl}&hideEmbedTopBar=true`}
            className={cn(
                `${isLoading && "hidden"} max-w-[50rem] w-[97%] md:mx-auto aspect-video rounded-sm shadow-md md:shadow-xl`,
                playerClassName
            )}
        />
        {isLoading && <Skeleton className={cn("max-w-[50rem] w-full mx-auto aspect-video", skeletonClassName)} />}
    </div>
}