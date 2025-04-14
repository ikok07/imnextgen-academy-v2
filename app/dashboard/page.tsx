import DashboardPageTitle from "@/app/_components/dashboard/DashboardPageTitle";
import ModulesGrid from "@/app/_components/dashboard/classroom/ModulesGrid";

export default async function Page() {

    return <div>
        <DashboardPageTitle>Класна стая</DashboardPageTitle>
        <ModulesGrid />
    </div>
}