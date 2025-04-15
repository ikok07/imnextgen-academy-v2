"use client"

import {Module} from "@/drizzle/schema/modules";
import Image from "next/image";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getFinishedVideos} from "@/app/dashboard/actions";
import {useAppUser} from "@/app/_hooks/auth/useAppUser";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import {useEffect, useState} from "react";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import {useRouter} from "next/navigation";
import {Routes} from "@/app/_utils/nav/routes";

type ModuleBoxProps = {
    module: Module,
}

export default function ModuleBox({module}: ModuleBoxProps) {
    const {viewLoaded} = useViewLoaded();
    const [buttonLoading, setButtonLoading] = useState(true);
    const router = useRouter();

    const {userObject} = useAppUser();
    const {data: finishedVideosQuery, isLoading: isLoadingFinishedVideos} = useErrorQuery({
        queryFn: () => getFinishedVideos(module!.id, userObject.user!.id),
        queryKey: [`finished-videos-${module!.id}`],
        enabled: !!module?.id && !!userObject.user
    });

    const modulePercentage = finishedVideosQuery?.success ? finishedVideosQuery.value.percentage : 0;

    function handleClick() {
        router.push(Routes.dashboard.module(module.id));
    }

    useEffect(() => {
        if (viewLoaded) {
            setTimeout(() => setButtonLoading(false), 300)
        }
    }, [viewLoaded]);

    return <div className="rounded-lg shadow-xl border border-border w-[95%] md:w-full">
        {module.image_url && <div className="relative w-full aspect-video"><Image alt={module.title} src={module.image_url} fill className="rounded-t-lg"/></div>}
        <div className="px-2 py-3">
            <div className="h-[7.5rem] overflow-auto">
                <h2 className="text-lg font-bold mb-1">{module.title}</h2>
                <p className="text-[0.8rem] text-primary/50">{module.description}</p>
            </div>
            {!viewLoaded || buttonLoading || isLoadingFinishedVideos || !module ?
                <Skeleton className="w-full h-8 aspect-video mt-6" />
                :
                modulePercentage > 0 ? <PrimaryButton className="mt-6 w-full" onClick={handleClick}>Продължаване ({Math.round(modulePercentage)}%)</PrimaryButton> : <SecondaryButton className="mt-6 w-full" onClick={handleClick}>Стартиране</SecondaryButton>
            }
        </div>
    </div>
}