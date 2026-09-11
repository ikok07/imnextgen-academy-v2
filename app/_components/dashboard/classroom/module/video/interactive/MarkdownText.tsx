"use client"

import Markdown from "markdown-to-jsx";
import {ComponentProps} from "react";

/** Markdown без интерактивни блокове - за подсказки, карета и кратки текстове. */
export default function MarkdownText({children}: {children: string}) {
    return <Markdown
        options={{
            forceBlock: true,
            overrides: {
                a: (props: ComponentProps<"a">) => <a target="_blank" rel="noopener noreferrer" {...props} />
            }
        }}
    >
        {children}
    </Markdown>
}
