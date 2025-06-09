import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/app/_components/ui/shadcn/tooltip";
import {Card} from "@/app/_components/ui/shadcn/card";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {IoTrash} from "react-icons/io5";
import {UserSpecificMeeting} from "@/drizzle/schema/user_specific_meetings";
import {useMemo} from "react";
import {addMinutes, format} from "date-fns";
import {bg} from "date-fns/locale";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {unbookSalesMeeting} from "@/app/dashboard/admin/actions";
import { toast } from "sonner";
import {useQueryClient} from "react-query";

type AdminUserDetailsSalesMeetingRowProps = {
    salesMeeting: UserSpecificMeeting,
    selectedDate: number,
    selectedMentorId: string | null
}

export default function AdminUserDetailsSalesMeetingRow({salesMeeting, selectedDate, selectedMentorId}: AdminUserDetailsSalesMeetingRowProps) {
    const queryClient = useQueryClient();
    const isInThePast = useMemo(() => salesMeeting.date * 1000 < Date.now(), []);

    const {mutate: unbookSalesMeetingMethod, isLoading: isUnbookingSalesMeeting} = useErrorMutation({
        mutationFn: () => unbookSalesMeeting(salesMeeting, selectedMentorId ?? undefined),
        onError() {
            toast.error("Срещата не беше изтрита!");
        },
        onSuccess() {
            toast.success("Срещата е изтрита успешно!");
            queryClient.invalidateQueries([`user-specific-meetings-${selectedDate}`]);
        }
    })

    return <TooltipProvider>
        <Tooltip>
            <TooltipTrigger className={`w-full ${isInThePast ? "cursor-not-allowed" : "cursor-default"} ${isUnbookingSalesMeeting ? "pointer-events-none" : ""}`}>
                <Card className="px-3 py-2 flex items-center justify-between">
                    <div className="flex flex-col items-start">
                        <h6 className="font-semibold"><span className="capitalize">{format(salesMeeting.date * 1000, "EEEE", {locale: bg})}</span> - {format(salesMeeting.date * 1000, "dd.MM.yyyy")}</h6>
                        <p className="text-sm text-primary/70">{format(salesMeeting.date * 1000, "hh:mm", {locale: bg})} - {format(addMinutes(salesMeeting.date * 1000, salesMeeting.duration_minutes), "hh:mm", {locale: bg})}</p>
                    </div>
                    <PrimaryButton loading={isUnbookingSalesMeeting} onClick={() => unbookSalesMeetingMethod()} className={`${isInThePast ? "pointer-events-none bg-border" : "bg-red-500 hover:bg-red-600"}`}><IoTrash /></PrimaryButton>
                </Card>
            </TooltipTrigger>
            {isInThePast && <TooltipContent>
                <p>Срещата е прминала</p>
            </TooltipContent>}
        </Tooltip>
    </TooltipProvider>
}