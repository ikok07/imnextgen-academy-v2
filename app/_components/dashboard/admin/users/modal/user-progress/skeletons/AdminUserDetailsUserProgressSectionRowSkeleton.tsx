import {Card} from "@/app/_components/ui/shadcn/card";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";

export default function AdminUserDetailsUserProgressSectionRowSkeleton() {
    return <Card className="cursor-pointer px-3 py-2 hover:bg-border/50 transition-all duration-200 space-y-2">
        <div className="grid grid-cols-[1fr_auto] items-center mb-1">
            <Skeleton className="w-[60%] h-[1.2rem]"/>
            <Skeleton className="w-[1.1rem] h-[1.1rem] rounded-full"/>
        </div>
        <div className="flex items-center gap-3">
            <Skeleton className="w-full h-[0.6rem]"/>
            <Skeleton className="w-[2.25rem] h-[1rem]"/>
        </div>
    </Card>
}