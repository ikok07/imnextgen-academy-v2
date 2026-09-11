"use client"

import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/themes/prism-tomorrow.css";
import {cn} from "@/app/_utils/cn";

type CodeEditorProps = {
    value: string,
    onChange: (value: string) => void,
    language?: "javascript" | "jsx",
    readOnly?: boolean,
    className?: string,
    minRows?: number
}

export default function CodeEditor({value, onChange, language = "javascript", readOnly, className, minRows = 4}: CodeEditorProps) {
    const grammar = language === "jsx" ? Prism.languages.jsx : Prism.languages.javascript;
    const padded = value.split("\n").length < minRows
        ? value + "\n".repeat(minRows - value.split("\n").length)
        : value;

    return <div className={cn("rounded-md bg-[#1e1e1e] text-[0.85rem] overflow-auto", className)}>
        <Editor
            value={padded}
            onValueChange={readOnly ? () => {} : onChange}
            highlight={code => Prism.highlight(code, grammar, language)}
            padding={14}
            readOnly={readOnly}
            textareaClassName="focus:outline-none"
            preClassName="!whitespace-pre"
            style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                lineHeight: 1.6,
                color: "#ccc",
                minHeight: `${minRows * 1.6 + 1.75}rem`
            }}
        />
    </div>
}
