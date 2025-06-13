import {IoCheckmarkCircle, IoEllipseOutline} from "react-icons/io5";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import {Progress} from "@/app/_components/ui/shadcn/progress";
import {Card} from "@/app/_components/ui/shadcn/card";

type AdminUserDetailsProgressContainerProps = {
    title: string,
    isSelected: boolean | undefined,
    isLoadingPercentage: boolean,
    percentage: number,
    onClick: () => void
}

export default function AdminUserDetailsProgressContainer({title, isSelected, isLoadingPercentage, percentage, onClick}: AdminUserDetailsProgressContainerProps) {
    return <Card className="cursor-pointer px-3 py-2 self-start hover:bg-border/50 transition-all duration-200" onClick={onClick}>
        <div className="grid grid-cols-[1fr_auto] items-center mb-1">
            <h4>{title}</h4>
            {isSelected == undefined ? <></> : isSelected ? <IoCheckmarkCircle className="text-cta text-xl"/> : <IoEllipseOutline className="text-primary/70 text-xl"/>}
        </div>
        {isLoadingPercentage ?
            <div className="flex items-center gap-3">
                <Skeleton className="w-full h-[0.6rem]"/>
                <Skeleton className="w-[2.25rem] h-[1rem]"/>
            </div>
            :
            <div className="flex items-center gap-3">
                <Progress value={percentage} sliderClassName={`${isSelected ? "bg-cta dark:bg-cta" : "bg-cta dark:bg-white"} `} className="flex-1"/>
                <h5 className="font-black text-cta text-sm">{percentage}%</h5>
            </div>
        }
    </Card>
}