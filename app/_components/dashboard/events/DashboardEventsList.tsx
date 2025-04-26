"use client"

import DashboardEventsListItem from "@/app/_components/dashboard/events/DashboardEventsListItem";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import {useDashboardEvents} from "@/app/_providers/DashboardEventsProvider";
import { format } from "date-fns";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getFullMeetingsForDate} from "@/app/dashboard/events/actions";
import {useCallback} from "react";
import {getFullMeetingStartTime} from "@/src/entities/utils/meetings/get-full-meeting-start-time.util";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoCloudOffline, IoSearch} from "react-icons/io5";
import DashboardEventsListItemSkeleton from "@/app/_components/dashboard/events/DashboardEventsListItemSkeleton";
import {checkMultipleResourcesAccess} from "@/app/actions";
import {SubscriptionTier} from "@/drizzle/schema/user_subscriptions";

type DashboardEventsListProps = {
    userId: string,
    userRoles: string[],
    subscriptionTier: SubscriptionTier | undefined
}

export default function DashboardEventsList({userId, userRoles, subscriptionTier}: DashboardEventsListProps) {
    const {selectedDate} = useDashboardEvents();

    const {data: fullMeetingsQuery, isLoading, isError} = useErrorQuery({
        queryFn: () => getFullMeetingsForDate(selectedDate),
        queryKey: `full-meetings-${selectedDate}`
    });

    const {data: accessDataQuery, isLoading: isLoadingAccessData, isError: accessDataError} = useErrorQuery({
        queryFn: () => checkMultipleResourcesAccess({
            principal: {
                id: userId,
                roles: userRoles,
                attr: {
                    access: subscriptionTier && subscriptionTier != "inactive" ? "subscription" : "free"
                }
            },
            resources: fullMeetingsQuery?.success ? fullMeetingsQuery.value.map(fullMeeting => ({
                resource: {
                    id: fullMeeting.id,
                    kind: "meeting",
                    attr: {
                        access: fullMeeting.access
                    }
                },
                actions: ["select"]
            })) : []
        }),
        enabled: !!fullMeetingsQuery?.success && fullMeetingsQuery.value.length != 0
    });

    const meetingsListItems = useCallback(() => {
        if (isLoading || isLoadingAccessData) return Array.from({length: 3}).map((_, index) => {
            return <DashboardEventsListItemSkeleton key={index} />
        });

        if (isError || accessDataError || !fullMeetingsQuery || !fullMeetingsQuery?.success) return <PrimaryErrorMessage
            Icon={IoCloudOffline}
            message="Събитията за избраната дата не можаха да бъдат заредени"
            title="Възникна грешка"
            iconClassName="text-4xl"
        />

        if (!fullMeetingsQuery.value || fullMeetingsQuery.value.length === 0) return <PrimaryErrorMessage
            Icon={IoSearch}
            message="За избраната дата не бяха намерени събития"
            title="Няма събития"
        />

        return fullMeetingsQuery.value.sort((a, b) => {
            const aStartTime = getFullMeetingStartTime(a, selectedDate);
            if (!aStartTime) return -1;
            const bStartTime = getFullMeetingStartTime(b, selectedDate);
            if (!bStartTime) return 1;

            return aStartTime.hours - bStartTime.hours !== 0 ? aStartTime.hours - bStartTime.hours : aStartTime.minutes - bStartTime.minutes;
        }).map((fullMeeting, index) => {
            return <DashboardEventsListItem
                hasAccess={!!accessDataQuery && accessDataQuery.success && accessDataQuery.value.some(v => v.resourceId === fullMeeting.id && v.actions["select"] === "EFFECT_ALLOW")}
                fullMeeting={fullMeeting}
                index={index}
                allItemsCount={fullMeetingsQuery.value.length}
                key={index}
            />
        })
    }, [selectedDate, isLoading, isLoadingAccessData]);

    return <Card className="relative flex flex-col w-full h-[35rem] pb-2 mb-5 md:mb-0">
        <div className="pointer-events-none absolute w-full h-[10rem] bottom-0 bg-gradient-to-t from-background to-transparent"/>
        <CardHeader className="py-3">
            <CardTitle className="text-xl">Налични срещи</CardTitle>
            <CardDescription>{format(selectedDate, "dd.MM.yyyy")}</CardDescription>
        </CardHeader>
        <CardContent className="w-full flex flex-col overflow-scroll space-y-2 mt-4">
            {meetingsListItems()}
        </CardContent>
    </Card>
}