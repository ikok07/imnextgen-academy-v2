"use client"

import {readInteractiveBlock} from "@/app/_utils/interactive/blocks";
import MarkdownText from "@/app/_components/dashboard/classroom/module/video/interactive/MarkdownText";

type StepsConfig = {
    title: string
}

/** Всяка част на блока (разделена с ---) е една стъпка. */
export default function Steps({raw}: {raw: string}) {
    const {config, parts} = readInteractiveBlock<StepsConfig>(raw);
    const steps = parts.filter(part => part.trim().length > 0);

    return <div className="not-prose my-7">
        {config.title && <p className="font-semibold mb-3">{config.title}</p>}
        <ol className="space-y-3">
            {steps.map((part, index) => (
                <li key={index} className="flex gap-3">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-main-gradient text-white flex items-center justify-center text-[0.8rem] font-semibold">
                        {index + 1}
                    </span>
                    <div className="min-w-0 pt-0.5 markdown-inner text-[0.95rem] leading-relaxed">
                        <MarkdownText>{part}</MarkdownText>
                    </div>
                </li>
            ))}
        </ol>
    </div>
}
