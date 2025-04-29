import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";

export default function DashboardShopBoxPriceSkeleton() {
    return <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-end gap-1">
            <Skeleton className="w-[3rem] h-[1.7rem]"/>
            <Skeleton className="w-[2rem] h-[1rem] rounded-sm"/>
        </div>
        <Skeleton className="w-[2rem] h-[2rem]" />
    </div>
}