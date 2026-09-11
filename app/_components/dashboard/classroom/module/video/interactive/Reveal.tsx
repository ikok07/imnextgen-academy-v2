"use client"

import {useState} from "react";
import {IoChevronForward} from "react-icons/io5";
import {readInteractiveBlock} from "@/app/_utils/interactive/blocks";
import MarkdownText from "@/app/_components/dashboard/classroom/module/video/interactive/MarkdownText";
import {cn} from "@/app/_utils/cn";

type RevealConfig = {
    title: string
}

export default function Reveal({raw}: {raw: string}) {
    const {config, parts} = readInteractiveBlock<RevealConfig>(raw);
    const [open, setOpen] = useState(false);

    return <div className="not-prose my-5 rounded-lg border border-border overflow-hidden">
        <button
            type="button"
            onClick={() => setOpen(value => !value)}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-left bg-secondary hover:bg-secondary/70 transition-colors"
        >
            <IoChevronForward className={cn("transition-transform shrink-0", open && "rotate-90")} />
            <span className="font-medium text-[0.9rem]">{config.title ?? "Покажи отговора"}</span>
        </button>
        {open && <div className="px-4 py-3 markdown-inner text-[0.95rem] leading-relaxed">
            <MarkdownText>{parts.join("\n\n")}</MarkdownText>
        </div>}
    </div>
}
