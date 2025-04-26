import {IconType} from "react-icons";
import {cn} from "@/app/_utils/cn";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";

type PrimaryErrorMessageProps = {
    Icon: IconType,
    title: string,
    message: string,
    backURI?: string
    className?: string,
    iconClassName?: string
}

export default function PrimaryErrorMessage({Icon, title, message, backURI, className, iconClassName}: PrimaryErrorMessageProps) {
    return <div className={cn(
        "flex flex-col items-center justify-center text-center",
        className
    )}>
        <Icon className={cn(
            "text-5xl text-cta",
            iconClassName
        )} />
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-primary/50">{message}</p>
        {backURI && <PrimaryButton href={backURI} className="mt-5">Връщане назад</PrimaryButton>}
    </div>
}