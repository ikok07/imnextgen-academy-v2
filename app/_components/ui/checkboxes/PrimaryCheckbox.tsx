import {Checkbox} from "@/app/_components/ui/shadcn/checkbox";
import {ComponentProps, ReactNode} from "react";
import {cn} from "@/app/_utils/cn";

type PrimaryCheckboxProps = {
    label: string | ReactNode
    boxClassName?: string,
    labelClassName?: string,
} & ComponentProps<typeof Checkbox>;

export default function PrimaryCheckbox({label, boxClassName, labelClassName, className, ...props}: PrimaryCheckboxProps) {
    return <div className={cn(
        "flex items-center gap-3",
        boxClassName
    )}>
        <Checkbox
            className={cn(
                "border-primary/20 dark:border-border dark:data-[state=checked]:text-white data-[state=checked]:bg-main-gradient",
                className
            )}
            {...props}
        />
        <small
            className={cn(
                "font-semibold checkbox-label",
                labelClassName
            )}
        >{label}</small>
    </div>
}