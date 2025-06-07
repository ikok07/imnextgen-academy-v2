import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/app/_components/ui/shadcn/tooltip";
import {Card} from "@/app/_components/ui/shadcn/card";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {IoTrash} from "react-icons/io5";
import {UserSpecificMeeting} from "@/drizzle/schema/user_specific_meetings";
import {useMemo} from "react";
import {addMinutes, format} from "date-fns";
import {bg} from "date-fns/locale";

type AdminUserDetailsSalesMeetingRowProps = {
    salesMeeting: UserSpecificMeeting
}

export default function AdminUserDetailsSalesMeetingRow({salesMeeting}: AdminUserDetailsSalesMeetingRowProps) {
    const isInThePast = useMemo(() => salesMeeting.date * 1000 < Date.now(), []);

    return <TooltipProvider>
        <Tooltip>
            <TooltipTrigger className={`w-full ${isInThePast ? "cursor-not-allowed" : "cursor-default"}`}>
                <Card className="px-3 py-2 flex items-center justify-between">
                    <div className="flex flex-col items-start">
                        <h6 className="font-semibold"><span className="capitalize">{format(salesMeeting.date * 1000, "EEEE", {locale: bg})}</span> - {format(salesMeeting.date * 1000, "dd.MM.yyyy")}</h6>
                        <p className="text-sm text-primary/70">{format(salesMeeting.date * 1000, "hh:mm", {locale: bg})} - {format(addMinutes(salesMeeting.date * 1000, salesMeeting.duration_minutes), "hh:mm", {locale: bg})}</p>
                    </div>
                    <PrimaryButton className={`${isInThePast ? "pointer-events-none bg-border" : "bg-red-500 hover:bg-red-600"}`}><IoTrash /></PrimaryButton>
                </Card>
            </TooltipTrigger>
            {isInThePast && <TooltipContent>
                <p>Срещата е прминала</p>
            </TooltipContent>}
        </Tooltip>
    </TooltipProvider>
}