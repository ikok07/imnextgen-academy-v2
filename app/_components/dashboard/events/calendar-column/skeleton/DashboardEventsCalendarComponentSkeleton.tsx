import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";

export default function DashboardEventsCalendarComponentSkeleton() {
    return <div className="px-6 mt-4">
        <div className="flex items-center justify-between mb-4">
            <Skeleton className="w-[1.35rem] h-[1.35rem]" />
            <Skeleton className="w-[40%] h-[0.5rem]"/>
            <Skeleton className="w-[1.35rem] h-[1.35rem]" />
        </div>
        <div className="grid grid-cols-7 grid-rows-5 gap-y-5">
            {Array.from({length: 35}).map((_, index) => {
                return <Skeleton className="w-[1.25rem] h-[1.25rem] mx-auto rounded-full" key={index} />
            })}
        </div>
    </div>
}