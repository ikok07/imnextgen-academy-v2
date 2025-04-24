import SetActiveLinkComponent from "@/app/_components/dashboard/nav/SetActiveLinkComponent";
import DashboardEventsCalendarColumn from "@/app/_components/dashboard/events/calendar-column/DashboardEventsCalendarColumn";
import DashboardEventsProvider from "@/app/_providers/DashboardEventsProvider";
import DashboardEventsList from "@/app/_components/dashboard/events/DashboardEventsList";
import {getMeetingsForDate} from "@/app/dashboard/events/actions";

export default async function Page() {

    await getMeetingsForDate(Date.now());

    return <SetActiveLinkComponent linkId="events">
        <DashboardEventsProvider>
            <div className="w-full min-h-[100vh] grid place-content-center">
                <div className="grid grid-cols-[1fr_2fr] max-w-[50rem] gap-x-4">
                    <DashboardEventsCalendarColumn />
                    <DashboardEventsList />
                </div>
            </div>
        </DashboardEventsProvider>
    </SetActiveLinkComponent>
}