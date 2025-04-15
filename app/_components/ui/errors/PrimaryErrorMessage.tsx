import {IconType} from "react-icons";
import {cn} from "@/app/_utils/cn";

type PrimaryErrorMessageProps = {
    Icon: IconType,
    title: string,
    message: string,
    className?: string
}

export default function PrimaryErrorMessage({Icon, title, message, className}: PrimaryErrorMessageProps) {
    return <div className={cn(
        "flex flex-col items-center justify-center text-center",
        className
    )}>
        <Icon className="text-5xl text-gray-700" />
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-primary/50">{message}</p>
    </div>
}