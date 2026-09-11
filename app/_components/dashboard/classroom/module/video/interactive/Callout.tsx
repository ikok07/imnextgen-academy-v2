"use client"

import {IoAlertCircleOutline, IoBulbOutline, IoInformationCircleOutline, IoWarningOutline} from "react-icons/io5";
import {readInteractiveBlock} from "@/app/_utils/interactive/blocks";
import MarkdownText from "@/app/_components/dashboard/classroom/module/video/interactive/MarkdownText";
import {ReactNode} from "react";

type CalloutType = "info" | "tip" | "warn" | "danger";

type CalloutConfig = {
    type: CalloutType,
    title: string
}

const STYLES: Record<CalloutType, {border: string, bg: string, icon: ReactNode, label: string}> = {
    info: {border: "border-sky-500", bg: "bg-sky-500/5", icon: <IoInformationCircleOutline className="text-sky-500" />, label: "Забележка"},
    tip: {border: "border-cta", bg: "bg-cta/5", icon: <IoBulbOutline className="text-cta" />, label: "Съвет"},
    warn: {border: "border-amber-500", bg: "bg-amber-500/5", icon: <IoWarningOutline className="text-amber-500" />, label: "Внимание"},
    danger: {border: "border-red-500", bg: "bg-red-500/5", icon: <IoAlertCircleOutline className="text-red-500" />, label: "Клопка"}
};

export default function Callout({raw}: {raw: string}) {
    const {config, parts} = readInteractiveBlock<CalloutConfig>(raw);
    const style = STYLES[config.type ?? "info"] ?? STYLES.info;
    const body = parts.join("\n\n");

    return <div className={`not-prose my-6 border-l-4 ${style.border} ${style.bg} rounded-r-md px-4 py-3`}>
        <p className="flex items-center gap-2 font-semibold text-[0.95rem] mb-1">
            <span className="text-lg leading-none">{style.icon}</span>
            {config.title ?? style.label}
        </p>
        <div className="markdown-inner text-[0.95rem] leading-relaxed">
            <MarkdownText>{body}</MarkdownText>
        </div>
    </div>
}
