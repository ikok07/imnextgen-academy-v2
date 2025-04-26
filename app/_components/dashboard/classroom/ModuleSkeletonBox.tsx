import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";

export default function ModuleSkeletonBox() {
    return <div className="rounded-lg shadow-xl border border-border w-[95%] md:w-full mx-auto">
        <Skeleton className="w-full aspect-video" />
        <div className="px-2 py-3">
            <div className="h-[7.5rem] overflow-auto">
                <Skeleton className="w-[80%] h-5"/>
                <div className="mt-3 space-y-1">
                    <Skeleton className="w-[60%] h-3"/>
                    <Skeleton className="w-[50%] h-3"/>
                    <Skeleton className="w-[20%] h-3"/>
                </div>
            </div>
            <Skeleton className="w-full h-8 aspect-video mt-6" />
        </div>
    </div>
}