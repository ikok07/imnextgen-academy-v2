"use client"

import {IoBookmarkOutline} from "react-icons/io5";
import {readInteractiveBlock} from "@/app/_utils/interactive/blocks";
import MarkdownText from "@/app/_components/dashboard/classroom/module/video/interactive/MarkdownText";

type TakeawaysConfig = {
    title: string
}

export default function Takeaways({raw}: {raw: string}) {
    const {config, parts} = readInteractiveBlock<TakeawaysConfig>(raw);

    return <div className="not-prose my-8 rounded-lg bg-secondary/60 border border-border px-4 py-4">
        <p className="flex items-center gap-2 font-semibold mb-2">
            <IoBookmarkOutline className="text-cta" />
            {config.title ?? "Какво да запомниш"}
        </p>
        <div className="markdown-inner text-[0.95rem] leading-relaxed">
            <MarkdownText>{parts.join("\n\n")}</MarkdownText>
        </div>
    </div>
}
