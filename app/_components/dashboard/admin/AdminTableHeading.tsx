import {ReactNode} from "react";
import {cn} from "@/app/_utils/cn";

type AdminTableHeadingProps = {
    children: ReactNode,
    className?: string
}

export default function AdminTableHeading({children, className}: AdminTableHeadingProps) {
    return <div className={cn(
        "text-2xl font-semibold mb-4",
        className
    )}>{children}</div>
}