import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import AdminMediaItemPropertyBoxSkeleton
    from "@/app/_components/dashboard/admin/media/skeletons/AdminMediaItemPropertyBoxSkeleton";

export default function AdminModuleManageDetailsContainerSkeleton() {
    return <div className="grid sm:grid-cols-[1fr_2fr] gap-4 mt-4">
        <div className="flex flex-col items-center">
            <Skeleton className="w-full aspect-video rounded-lg" />
        </div>
        <div>
            <Skeleton className="w-[70%] h-[1.4rem]" />
            <Skeleton className="w-[60%] h-[0.5rem] mt-3 mb-2" />
            <Skeleton className="w-[40%] h-[0.5rem]" />
            <div className="grid grid-cols-2 items-center gap-5 mt-4">
                <AdminMediaItemPropertyBoxSkeleton />
                <AdminMediaItemPropertyBoxSkeleton />
                <AdminMediaItemPropertyBoxSkeleton />
                <AdminMediaItemPropertyBoxSkeleton />
            </div>
        </div>
    </div>
}