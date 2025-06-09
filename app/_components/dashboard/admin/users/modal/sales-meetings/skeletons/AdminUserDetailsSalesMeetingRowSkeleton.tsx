import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import {Card} from "@/app/_components/ui/shadcn/card";

export default function AdminUserDetailsSalesMeetingRowSkeleton() {
    return <Card className="w-full h-[4rem] px-3 py-2 flex items-center justify-between">
        <div className="flex flex-col items-start space-y-2">
            <Skeleton className="w-[10rem] h-[1rem]" />
            <Skeleton className="w-[5rem] h-[0.7rem]"/>
        </div>
        <Skeleton className="w-[2.5rem] h-[1.75rem]"/>
    </Card>
}