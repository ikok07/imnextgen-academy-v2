import {LoadingSpinner} from "@/app/_components/ui/shadcn/loading-spinner";
import {cn} from "@/app/_utils/cn";

type PrimaryLoaderProps = {
    className?: string
}

export default function PrimaryLoader({className}: PrimaryLoaderProps) {
    return <LoadingSpinner className={cn(
        "stroke-border",
        className
    )}/>
}