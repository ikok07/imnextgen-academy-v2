import {IconType} from "react-icons";
import {cn} from "@/app/_utils/cn";
import {Card} from "@/app/_components/ui/shadcn/card";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";

type BankCreditFormPropertyBoxProps = {
    Icon: IconType,
    label: string,
    value: string,
    isLoading: boolean,
    className?: string
}

export default function BankCreditFormPropertyBox({Icon, label, value, isLoading, className}: BankCreditFormPropertyBoxProps) {

    let content = <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-2 duration-300 ease-in">
        <Icon className="text-2xl text-cta" />
        <p className="text-primary/70 text-sm">{label}</p>
        <h4 className="font-black text-lg">{value}</h4>
    </div>;

    if (isLoading) {
        content = <div className="flex flex-col items-center animate-out fade-out slide-out-top-bottom-2 duration-300">
            <Skeleton className="w-[1.6em] h-[1.6rem] rounded-full" />
            <Skeleton className="w-[50%] h-[0.7rem] mt-2" />
            <Skeleton className="w-[30%] h-[1.1rem] mt-2" />
        </div>
    }

    return <Card className={cn(
        "py-4 text-center",
        className
    )}>
        {content}
    </Card>
}