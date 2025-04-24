import DashboardEventsCalendar from "@/app/_components/dashboard/events/calendar-column/DashboardEventsCalendar";
import {Card} from "@/app/_components/ui/shadcn/card";
import DashboardEventsCalendarAccessLevelMessage
    from "@/app/_components/dashboard/events/calendar-column/DashboardEventsCalendarAccessLevelMessage";
import {auth} from "@clerk/nextjs/server";
import {getUserSubscription} from "@/app/actions";

export default async function DashboardEventsCalendarColumn() {
    const authObject = await auth();
    if (!authObject.userId) throw new Error("User not logged in!");

    const subscriptionResponse = await getUserSubscription(authObject.userId);
    if (!subscriptionResponse.success) throw new Error("User's subscription is not available!")

    return <Card className="flex flex-col justify-between h-full">
        <DashboardEventsCalendar />
        <DashboardEventsCalendarAccessLevelMessage
            restricted={
            !subscriptionResponse.value?.subscription_tier ||
             subscriptionResponse.value.subscription_tier == "inactive"
        }
        />
    </Card>
}