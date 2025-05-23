import {cn} from "@/app/_utils/cn";
import {ReactNode} from "react";

type SectionHeadingProps = {
    title: string | ReactNode,
    description: string | ReactNode,
    className?: string
}

export default function SectionHeading({title, description, className}: SectionHeadingProps) {
    return <div className={cn(
        className
    )}>
        <h1 className="text-3xl font-black">{title}</h1>
        <p className="text-[0.9rem] md:text-[1rem] mt-2">{description}</p>
    </div>
}