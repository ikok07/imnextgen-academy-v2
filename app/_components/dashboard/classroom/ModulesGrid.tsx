"use client"

import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getAllModules} from "@/app/dashboard/actions";
import {toast} from "sonner";
import {useEffect} from "react";
import ModuleBox from "@/app/_components/dashboard/classroom/ModuleBox";

export default function ModulesGrid() {

    const {data: modulesQuery, isLoading: isLoadingModules} = useErrorQuery({
        queryFn: () => getAllModules(),
        queryKey: ["modules"],
        staleTime: 120_000,
        onError: (e) => {
            toast.error("Възникна грешка! Моля, опитайте отново!");
        },
    });

    return <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[30rem] md:max-w-[60rem] mx-auto">
        {modulesQuery?.success && modulesQuery.value.map((module, index) => {
            return <ModuleBox key={index} module={module} />
        })}
    </div>
}