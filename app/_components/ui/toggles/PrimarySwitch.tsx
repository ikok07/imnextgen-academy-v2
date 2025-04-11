import {Switch} from "@/app/_components/ui/shadcn/switch";
import {ComponentProps} from "react";
import {cn} from "@/app/_utils/cn";

type PrimarySwitchProps = ComponentProps<typeof Switch>

export default function PrimarySwitch({className, ...props}: PrimarySwitchProps) {
    return <Switch
        className={cn(
            "data-[state=checked]:bg-cta",
            className
        )}
        {...props}
    />
}