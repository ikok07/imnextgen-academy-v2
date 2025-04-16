import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import {ChevronRight} from "lucide-react";

export default function BreadcrumbSkeleton() {
    return <div className="flex flex-wrap items-center gap-3 py-4 [&>svg]:w-3.5 [&>svg]:h-3.5">
        <Skeleton className="w-[4rem] h-[0.9rem]"/>
        <ChevronRight className="stroke-border"/>
        <Skeleton className="w-[6rem] h-[0.9rem]"/>
        <ChevronRight className="stroke-border"/>
        <Skeleton className="w-[8rem] h-[0.9rem]"/>
    </div>
}