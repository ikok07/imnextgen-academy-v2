"use client"

import {ComponentProps, ReactElement, useState} from "react";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import {vscDarkPlus as CodeStyle} from "react-syntax-highlighter/dist/esm/styles/prism"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {IoCheckmarkCircle, IoCopyOutline} from "react-icons/io5";
import Markdown from "markdown-to-jsx";
import {isInteractiveBlock, languageFromClassName} from "@/app/_utils/interactive/blocks";
import InteractiveBlock from "@/app/_components/dashboard/classroom/module/video/interactive/InteractiveBlock";

export function CodeBlock({code, lang}: {code: string, lang: string}) {

    const [copied, setCopied] = useState(false);

    return <div className="grid not-prose my-5">
        <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
            <div className="cursor-pointer flex items-center gap-2 text-lg justify-self-end group">
                {copied ? <IoCheckmarkCircle className="text-accent" /> : <IoCopyOutline className="group-hover:text-accent transition-all duration-200"/>}
                <small className={`${copied ? "text-accent" : "group-hover:text-accent"} transition-all duration-200`}>{copied ? "Копирано" : "Копиране"}</small>
            </div>
        </CopyToClipboard>
        <SyntaxHighlighter language={lang} style={CodeStyle} customStyle={{borderRadius: "7px"}}>
            {code}
        </SyntaxHighlighter>
    </div>
}

export function PreBlock({children, ...rest}: ComponentProps<"pre">) {
    const childrenComponent = children as ReactElement | undefined;

    if (childrenComponent && childrenComponent.props) {
        const language = languageFromClassName(childrenComponent.props.className);
        const rawChildren = childrenComponent.props.children;
        const code = Array.isArray(rawChildren) ? rawChildren.join("") : String(rawChildren ?? "");

        if (isInteractiveBlock(language)) return <InteractiveBlock type={language} raw={code} />;

        return <CodeBlock code={code} lang={language} />
    }
    return <pre {...rest}>{children}</pre>;
}

type DashboardModuleVideoDescriptionProps = {
    description: string
}

export default function DashboardModuleVideoDescription({description}: DashboardModuleVideoDescriptionProps) {
    return <Markdown
        className="lesson-prose"
        options={{
            forceWrapper: true,
            overrides: {
                a: (props: ComponentProps<"a">) => <a target="_blank" {...props} />,
                pre: PreBlock
            }
        }}
    >
        {description}
    </Markdown>
}
