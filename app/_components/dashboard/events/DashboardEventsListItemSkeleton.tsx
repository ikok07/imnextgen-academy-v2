import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import {Card} from "@/app/_components/ui/shadcn/card";

export default function DashboardEventsListItemSkeleton() {
    return <Card className="flex gap-3 w-full h-[6.5rem]">
        <Skeleton className="relative w-[30%] h-full rounded-l-xl overflow-hidden" />
        <div className="p-2 flex-1 overflow-hidden">
            <Skeleton className="w-[60%] h-[1.5rem] mb-1" />
            <Skeleton className="h-[0.7rem] mb-1" />
            <div className="mt-2 flex items-center justify-between">
                <Skeleton className="w-[4rem] h-[1.2rem]" />
                <Skeleton className="w-[5rem] h-[1.9rem]" />
            </div>
        </div>
    </Card>
}