"use client"

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/app/_components/ui/shadcn/tooltip"
import {LucideKeyRound, LucideShieldCheck} from "lucide-react";
import {useWindowWidth} from "@react-hook/window-size";

type DashboardEventsCalendarAccessLevelMessageProps = {
    restricted: boolean
}

export default function DashboardEventsCalendarAccessLevelMessage({restricted}: DashboardEventsCalendarAccessLevelMessageProps) {
    const width = useWindowWidth();
    const Icon = restricted ? LucideKeyRound : LucideShieldCheck;

    return <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <div className="p-2 mt-3 lg:mt-0 mx-3 mb-3 flex flex-col gap-2 text-left hover:bg-border/50 rounded-lg">
                    <Icon width={`${width < 500 ? 1.75 : 2.25}rem`} height={`${width < 500 ? 1.75 : 2.25}rem`} className={`${restricted ? "text-primary/70" : "text-cta"}`} />
                    <div>
                        <h1 className="text-[0.9rem] font-bold">{restricted ? "Ограничен достъп" : "Неограничен достъп"}</h1>
                        <p className="text-sm text-primary/70">{restricted ? "Можеш да достъпваш само безплатни срещи" : "При проблем се свържи с екипа ни"}</p>
                    </div>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                {restricted ? "За да достъпиш всички срещи, е необходимо да си закупиш абонамент" : `Имейл за контакт: ${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
}