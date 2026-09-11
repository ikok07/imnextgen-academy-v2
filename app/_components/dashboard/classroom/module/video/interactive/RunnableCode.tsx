"use client"

import {useState} from "react";
import {IoPlay, IoRefresh} from "react-icons/io5";
import CodeEditor from "@/app/_components/dashboard/classroom/module/video/interactive/CodeEditor";
import ConsoleOutput from "@/app/_components/dashboard/classroom/module/video/interactive/ConsoleOutput";
import {useCodeSandbox} from "@/app/_components/dashboard/classroom/module/video/interactive/useCodeSandbox";
import {readInteractiveBlock} from "@/app/_utils/interactive/blocks";

type RunnableConfig = {
    title: string,
    language: "javascript" | "jsx",
    waitMs: number
}

export default function RunnableCode({raw}: {raw: string}) {
    const {config, parts} = readInteractiveBlock<RunnableConfig>(raw);
    const initial = parts[0] ?? "";
    const [code, setCode] = useState(initial);
    const {run, running, result, liveLogs} = useCodeSandbox();

    return <div className="not-prose my-6 rounded-lg border border-border overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-3 py-2 bg-secondary">
            <p className="text-[0.8rem] font-medium truncate">{config.title ?? "Пробвай кода"}</p>
            <div className="flex items-center gap-2">
                {code !== initial && <button
                    type="button"
                    onClick={() => setCode(initial)}
                    className="text-[0.75rem] text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                    <IoRefresh /> Нулирай
                </button>}
                <button
                    type="button"
                    onClick={() => run(code, [], config.waitMs ?? 0)}
                    disabled={running}
                    className="text-[0.8rem] bg-main-gradient text-white rounded-md px-3 py-1 flex items-center gap-1.5 disabled:opacity-60"
                >
                    <IoPlay /> {running ? "Изпълнявам..." : "Изпълни"}
                </button>
            </div>
        </div>
        <CodeEditor value={code} onChange={setCode} language={config.language ?? "javascript"} minRows={3} className="rounded-none" />
        {(liveLogs.length > 0 || result) && <div className="p-3 bg-card">
            <ConsoleOutput logs={liveLogs} error={result?.error} empty="Кодът не изведе нищо в конзолата." />
        </div>}
    </div>
}
