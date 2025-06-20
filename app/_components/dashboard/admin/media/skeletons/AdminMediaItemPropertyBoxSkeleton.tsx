import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";

export default function AdminMediaItemPropertyBoxSkeleton() {
    return <div className="grid grid-cols-[auto_1fr] gap-2">
        <Skeleton className="w-[1.6rem] aspect-square" />
        <div className="space-y-1">
            <Skeleton className="w-[30%] h-[0.6rem]"/>
            <Skeleton className="w-[60%] h-[1rem]"/>
        </div>
    </div>
}