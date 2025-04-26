"use client"

import DashboardEventsCalendar from "@/app/_components/dashboard/events/calendar-column/DashboardEventsCalendar";
import {Card, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import DashboardEventsCalendarAccessLevelMessage
    from "@/app/_components/dashboard/events/calendar-column/DashboardEventsCalendarAccessLevelMessage";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/app/_components/ui/shadcn/drawer";
import {IoCalendarOutline} from "react-icons/io5";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {SubscriptionTier} from "@/drizzle/schema/user_subscriptions";
import {useWindowWidth} from "@react-hook/window-size";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import DashboardEventsCalendarColumnSkeleton
    from "@/app/_components/dashboard/events/calendar-column/skeleton/DashboardEventsCalendarColumnSkeleton";
import {useState} from "react";

type DashboardEventsCalendarColumnProps = {
    subscriptionTier: SubscriptionTier | undefined
}

export default function DashboardEventsCalendarColumn({subscriptionTier}: DashboardEventsCalendarColumnProps) {
    const width = useWindowWidth();
    const {viewLoaded} = useViewLoaded();
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    const title = "Календар";
    const description = "Избери желаната от теб дата";
    const content = <>
        <DashboardEventsCalendar onSelect={() => setMobileDrawerOpen(false)}/>
        <DashboardEventsCalendarAccessLevelMessage
            restricted={
                !subscriptionTier || subscriptionTier == "inactive"
            }
        />
    </>

    if (!viewLoaded) return <DashboardEventsCalendarColumnSkeleton title={title} description={description} />;

    if (width > 900) {
        return <Card className="grid grid-rows-[auto_1fr] h-full">
            <CardHeader className="pb-2">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <div className="flex flex-col justify-between">
                {content}
            </div>
        </Card>
    }

    return <Drawer open={mobileDrawerOpen}>
        <DrawerTrigger asChild={true}>
            <SecondaryButton onClick={() => setMobileDrawerOpen(true)}>
                <IoCalendarOutline />
                Календар
            </SecondaryButton>
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader className="!text-center">
                <DrawerTitle>{title}</DrawerTitle>
                <DrawerDescription>{description}</DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col items-center">
                {content}
            </div>
        </DrawerContent>
    </Drawer>
}