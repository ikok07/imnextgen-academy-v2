"use client"

import {cn} from "@/app/_utils/cn";
import {TECHNOLOGIES} from "@/app/_utils/home/technologies/technologies";
import {materialDark as CodeStyle} from "react-syntax-highlighter/dist/esm/styles/prism";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";

type TechnologyCodeSnippetCarouselProps = {
    activeTechnologyIndex: number
}

export default function TechnologyCodeSnippetCarousel({activeTechnologyIndex}: TechnologyCodeSnippetCarouselProps) {
    return <div className="relative bg-[#2e2e2e] rounded-sm h-[20rem] overflow-x-hidden">
        <div className="absolute w-4 h-full bg-gradient-to-l from-[#2e2e2e] to-transparent right-0 z-20"/>
        <div
            style={{
                transform: `translateX(-${activeTechnologyIndex * 100}%)`
            }}
            className={cn(
                "flex",
                "transition-transform duration-500 [transition-timing-function:cubic-bezier(.65,.05,.36,1)]"
            )}
        >
            {TECHNOLOGIES.map((technology, index) => {
                return <SyntaxHighlighter
                    language={technology.language}
                    style={CodeStyle}
                    customStyle={{margin: 0, width: "100%", height: "20rem", flex: "1 0 100%", overflow: "auto"}}
                    codeTagProps={{className: "text-[0.9rem]"}}
                    key={index}
                >
                    {technology.code}
                </SyntaxHighlighter>
            })}
        </div>
    </div>
}