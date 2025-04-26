import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";

export default function DashboardEventsCalendarAccessLevelMessageSkeleton() {
    return <div>
        <div className="p-2 mx-3 mb-3">
            <Skeleton className="w-[2.25rem] h-[2.25rem] mb-2 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="w-[40%] h-[1rem]" />
                <Skeleton className="w-[70%] h-[0.5rem]" />
                <Skeleton className="w-[50%] h-[0.5rem]" />
            </div>
        </div>
    </div>
}