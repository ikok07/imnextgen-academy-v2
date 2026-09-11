"use client"

import {SandboxLog} from "@/app/_components/dashboard/classroom/module/video/interactive/useCodeSandbox";
import {cn} from "@/app/_utils/cn";

const LEVEL_CLASSES: Record<SandboxLog["level"], string> = {
    log: "text-gray-200",
    info: "text-sky-300",
    warn: "text-amber-300",
    error: "text-red-400"
};

type ConsoleOutputProps = {
    logs: SandboxLog[],
    error?: string,
    empty?: string
}

export default function ConsoleOutput({logs, error, empty = "Конзолата е празна."}: ConsoleOutputProps) {
    return <div className="rounded-md bg-[#141414] border border-white/10 p-3 font-mono text-[0.8rem] leading-relaxed max-h-64 overflow-auto">
        <div className="text-[0.65rem] uppercase tracking-wider text-gray-500 mb-2">Конзола</div>
        {logs.length === 0 && !error && <p className="text-gray-500">{empty}</p>}
        {logs.map((log, index) => (
            <p key={index} className={cn("whitespace-pre-wrap break-words", LEVEL_CLASSES[log.level])}>
                <span className="text-gray-600 select-none mr-2">›</span>{log.text}
            </p>
        ))}
        {error && <p className="whitespace-pre-wrap break-words text-red-400 mt-1">
            <span className="text-gray-600 select-none mr-2">✕</span>{error}
        </p>}
    </div>
}
