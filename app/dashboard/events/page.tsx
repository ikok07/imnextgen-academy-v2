import DashboardEventsCalendarColumn from "@/app/_components/dashboard/events/calendar-column/DashboardEventsCalendarColumn";
import DashboardEventsProvider from "@/app/_providers/DashboardEventsProvider";
import DashboardEventsList from "@/app/_components/dashboard/events/DashboardEventsList";
import {getUserSubscription} from "@/app/actions";
import DashboardPageTitle from "@/app/_components/dashboard/DashboardPageTitle";
import {getInjection} from "@/di/container";

export default async function Page() {

    const {user, auth: authObject} = await getInjection("IGetUserController")({excludeDbProfile: true});
    if (!authObject.userId || !user) throw new Error("User not logged in!");

    const subscriptionResponse = await getUserSubscription(authObject.userId);
    if (!subscriptionResponse.success) throw new Error("User's subscription is not available!")

    return <DashboardEventsProvider>
        <div className="w-full min-h-[100vh]">
            <DashboardPageTitle>Събития</DashboardPageTitle>
            <div className="mx-auto mt-5 grid mdlg:grid-cols-[1fr_2fr] grid-rows-[auto_1fr] w-[95%] max-w-[50rem] gap-x-4 gap-y-4">
                <DashboardEventsCalendarColumn subscriptionTier={subscriptionResponse.value?.tier} />
                <DashboardEventsList
                    userId={user.id}
                    userRoles={user.publicMetadata["roles"] as string[]}
                    subscriptionTier={subscriptionResponse.value?.tier}
                />
            </div>
        </div>
    </DashboardEventsProvider>
}