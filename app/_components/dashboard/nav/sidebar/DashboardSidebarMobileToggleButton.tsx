"use client"

import {IoMenuOutline} from "react-icons/io5";
import {useAppDispatch, useAppSelector} from "@/app/_hooks/redux";
import {setDashboardMobileSidebarOpen} from "@/app/_store/slices/dashboardSidebar";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import {cn} from "@/app/_utils/cn";
import {secondaryControlBackground} from "@/app/_components/ui/backgrounds/secondaryControlBackground";

export default function DashboardSidebarMobileToggleButton() {
    const {sidebarLoaded} = useAppSelector(state => state.dashboardSidebar);
    const dispatch = useAppDispatch();

    if (!sidebarLoaded) return <Skeleton className="visible md:hidden my-2 w-[2.3rem] h-[2.2rem]" />

    return <button
        className={
            cn(
                secondaryControlBackground("px-2"),
                "visible md:hidden w-max text-xl my-2",
            )
        }
        onClick={() => dispatch(setDashboardMobileSidebarOpen(true))}
    >
        <IoMenuOutline />
    </button>
}