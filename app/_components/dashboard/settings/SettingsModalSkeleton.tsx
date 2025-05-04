import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";

export default function SettingsModalSkeleton() {
    return  <div className="w-full h-full rounded-xl bg-background mx-auto p-5">
        <Skeleton className="w-[60%] h-[2rem]" />
        <hr className="w-full h-[1px] bg-primary mt-3" />
        <div className="space-y-2 mt-3">
            <div>
                <Skeleton className="w-[50%] h-[1rem]" />
                <div className="flex items-center gap-3 mt-3">
                    <Skeleton className="w-[3rem] aspect-square rounded-full" />
                    <Skeleton className="w-[50%] h-[1rem]" />
                </div>
                <hr className="w-full h-[1px] bg-primary mt-3" />
            </div>
            <Skeleton className="w-[45%] h-[0.9rem] mt-5" />
            <Skeleton className="w-[40%] h-[0.9rem]" />
        </div>
    </div>
}