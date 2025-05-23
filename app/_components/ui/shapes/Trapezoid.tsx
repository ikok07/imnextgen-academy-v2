import {cn} from "@/app/_utils/cn";

type TrapezoidProps = {
    width?: number | string,
    height?: number | string,
    angle?: number | string,
    color?: string,
    className?: string
}

export default function Trapezoid({width, height, angle, color, className}: TrapezoidProps) {
    return <div
        className={cn(
            "trapezoid",
            className
        )}
        style={{
            width: width ?? "125px",
            height: 0,
            borderBottom: `${height ?? "50px"} solid ${color ?? "#555"}`,
            borderInline: `${angle ?? "25px"} solid transparent`
    }}
    />
}