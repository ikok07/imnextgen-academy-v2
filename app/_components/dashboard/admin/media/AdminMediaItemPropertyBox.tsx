import {IconType} from "react-icons";
import {cn} from "@/app/_utils/cn";
import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import {ReactNode} from "react";

type AdminMediaItemPropertyBoxProps = {
    Icon: IconType,
    label: string,
    value: string,
    valueContent?: ReactNode,
    className?: string,
    iconClassName?: string,
    labelClassName?: string,
    valueClassName?: string
}

export default function AdminMediaItemPropertyBox({Icon, label, value, valueContent, className, iconClassName, labelClassName, valueClassName}: AdminMediaItemPropertyBoxProps) {
    return <div className={cn(
        "grid grid-cols-[auto_1fr] gap-2",
        className
    )}>
        <Icon
            className={cn(
                "text-[1.6rem] text-cta",
                iconClassName
            )}
        />
        <div className={`${valueContent ? "space-y-1" : "space-y-0"}`}>
            <h6
                className={cn(
                    "text-sm font-medium",
                    labelClassName
                )}
            >
                {label}
            </h6>
            {valueContent ?? <h4
                className={cn(
                    "font-bold",
                    valueClassName
                )}
            >
                {value}
            </h4>}
        </div>
    </div>
}