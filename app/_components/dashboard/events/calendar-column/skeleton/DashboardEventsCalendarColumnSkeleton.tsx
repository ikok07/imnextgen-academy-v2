import {Card, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import DashboardEventsCalendarAccessLevelMessageSkeleton
    from "@/app/_components/dashboard/events/calendar-column/skeleton/DashboardEventsCalendarAccessLevelMessageSkeleton";
import DashboardEventsCalendarComponentSkeleton
    from "@/app/_components/dashboard/events/calendar-column/skeleton/DashboardEventsCalendarComponentSkeleton";

type DashboardEventsCalendarColumnSkeletonProps = {
    title: string,
    description: string
}

export default function DashboardEventsCalendarColumnSkeleton({title, description}: DashboardEventsCalendarColumnSkeletonProps) {
    return <>
        <Skeleton className="mdlg:hidden w-full h-[2rem]" />
        <Card className="hidden mdlg:grid grid-rows-[auto_1fr] w-[19rem] h-full">
            <CardHeader className="pb-2">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <div className="flex flex-col justify-between">
                <DashboardEventsCalendarComponentSkeleton />
                <DashboardEventsCalendarAccessLevelMessageSkeleton />
            </div>
        </Card>
    </>
}