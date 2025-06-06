import {addMonths} from "date-fns";
import {bg} from "date-fns/locale";
import {Calendar} from "@/app/_components/ui/shadcn/calendar";
import {Dispatch, SetStateAction} from "react";
import {Card} from "@/app/_components/ui/shadcn/card";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {IoTrash} from "react-icons/io5";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/app/_components/ui/shadcn/tooltip";

type AdminUserDetailsSalesCalendarProps = {
    selectedDate: number,
    setSelectedDate: Dispatch<SetStateAction<number>>
}

export default function AdminUserDetailsSalesCalendar({selectedDate, setSelectedDate}: AdminUserDetailsSalesCalendarProps) {

    return <div className="grid grid-rows-[auto_1fr]">
        <Calendar
            mode="single"
            selected={new Date(selectedDate)}
            required={true}
            onSelect={d => d ? setSelectedDate(d.valueOf()) : {}}
            toMonth={addMonths(new Date(), 1)}
            locale={bg}
        />
        <div className="mt-3 grid grid-rows-[auto_1fr]">
            <h4 className="text-lg font-semibold">Запазени срещи</h4>
            <div className="space-y-4 mt-3 max-h-[50%] overflow-auto">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className={`w-full ${true ? "cursor-not-allowed" : ""}`}>
                            <Card className="px-3 py-2 flex items-center justify-between">
                                <div className="flex flex-col items-start">
                                    <h6 className="font-semibold">Събота - 24.06.2026</h6>
                                    <p className="text-sm text-primary/70">16:30 - 17:30</p>
                                </div>
                                <PrimaryButton className={`${true ? "pointer-events-none bg-border" : "bg-red-500 hover:bg-red-600"}`}><IoTrash /></PrimaryButton>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Срещата е прминала</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    </div>
}