import SetActiveLinkComponent from "@/app/_components/dashboard/nav/SetActiveLinkComponent";
import DashboardEventsCalendarColumn from "@/app/_components/dashboard/events/calendar-column/DashboardEventsCalendarColumn";
import DashboardEventsProvider from "@/app/_providers/DashboardEventsProvider";
import DashboardEventsList from "@/app/_components/dashboard/events/DashboardEventsList";
import {auth} from "@clerk/nextjs/server";
import {getUserSubscription} from "@/app/actions";
import DashboardPageTitle from "@/app/_components/dashboard/DashboardPageTitle";

export default async function Page() {

    const authObject = await auth();
    if (!authObject.userId) throw new Error("User not logged in!");

    const subscriptionResponse = await getUserSubscription(authObject.userId);
    if (!subscriptionResponse.success) throw new Error("User's subscription is not available!")

    return <SetActiveLinkComponent linkId="events">
        <DashboardEventsProvider>
            <div className="w-full min-h-[100vh]">
                <DashboardPageTitle>Събития</DashboardPageTitle>
                <div className="mx-auto mt-5 grid mdlg:grid-cols-[1fr_2fr] grid-rows-[auto_1fr] w-[95%] max-w-[50rem] gap-x-4 gap-y-4">
                    <DashboardEventsCalendarColumn subscriptionTier={subscriptionResponse.value?.subscription_tier} />
                    <DashboardEventsList />
                </div>
            </div>
        </DashboardEventsProvider>
    </SetActiveLinkComponent>
}