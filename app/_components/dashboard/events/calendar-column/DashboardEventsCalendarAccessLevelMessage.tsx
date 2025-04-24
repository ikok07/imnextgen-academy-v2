"use client"

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/app/_components/ui/shadcn/tooltip"
import {LucideKeyRound, LucideShieldCheck} from "lucide-react";

type DashboardEventsCalendarAccessLevelMessageProps = {
    restricted: boolean
}

export default function DashboardEventsCalendarAccessLevelMessage({restricted}: DashboardEventsCalendarAccessLevelMessageProps) {

    const Icon = restricted ? LucideKeyRound : LucideShieldCheck;

    return <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <div className="p-2 mx-3 mb-3 flex items-center gap-3 text-left hover:bg-border/50 rounded-lg">
                    <Icon width="2.5rem" height="2.5rem" className={`${restricted ? "text-primary/70" : "text-cta"}`} />
                    <div>
                        <h1 className="font-bold">{restricted ? "Ограничен достъп" : "Неограничен достъп"}</h1>
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