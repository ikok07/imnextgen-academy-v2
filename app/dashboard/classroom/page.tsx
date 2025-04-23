import DashboardPageTitle from "@/app/_components/dashboard/DashboardPageTitle";
import ModulesGrid from "@/app/_components/dashboard/classroom/ModulesGrid";
import ModuleSkeletonBox from "@/app/_components/dashboard/classroom/ModuleSkeletonBox";
import {Suspense} from "react";

export default async function Page() {
    const skeletonBoxes = <>{Array.from({length: 6}).map((_, index) => {
        return <ModuleSkeletonBox key={index} />
    })}</>

    return <div>
        <DashboardPageTitle>Класна стая</DashboardPageTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[30rem] md:max-w-[60rem] mx-auto mb-3">
            <Suspense fallback={skeletonBoxes}>
                <ModulesGrid />
            </Suspense>
        </div>
    </div>
}