"use client"

import {useEffect, useState} from "react";
import {IoBulbOutline, IoCheckmarkCircle, IoCloseCircle, IoEyeOutline, IoPlay, IoRefresh} from "react-icons/io5";
import CodeEditor from "@/app/_components/dashboard/classroom/module/video/interactive/CodeEditor";
import ConsoleOutput from "@/app/_components/dashboard/classroom/module/video/interactive/ConsoleOutput";
import {SandboxTestSpec, useCodeSandbox} from "@/app/_components/dashboard/classroom/module/video/interactive/useCodeSandbox";
import {useCheckpoint} from "@/app/_components/dashboard/classroom/module/video/interactive/LessonInteractivityProvider";
import {readInteractiveBlock} from "@/app/_utils/interactive/blocks";
import {cn} from "@/app/_utils/cn";
import MarkdownText from "@/app/_components/dashboard/classroom/module/video/interactive/MarkdownText";

type TaskConfig = {
    id: string,
    title: string,
    language: "javascript" | "jsx",
    tests: SandboxTestSpec[],
    hint: string,
    waitMs: number
}

export default function CodeTask({raw}: {raw: string}) {
    const {config, parts, error} = readInteractiveBlock<TaskConfig>(raw);
    const starter = parts[0] ?? "";
    const solution = parts[1];

    const checkpoint = useCheckpoint(config.id);
    const {run, running, result, liveLogs} = useCodeSandbox();
    const [code, setCode] = useState(starter);
    const [showHint, setShowHint] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [attempted, setAttempted] = useState(false);
    const [restored, setRestored] = useState(false);

    useEffect(() => {
        if (restored || !checkpoint.loaded) return;
        if (checkpoint.draft) setCode(checkpoint.draft);
        setRestored(true);
    }, [checkpoint.loaded, checkpoint.draft, restored]);

    const tests = config.tests ?? [];
    const passed = !!result?.tests?.length && result.tests.every(test => test.pass) && !result.error;

    async function check() {
        setAttempted(true);
        checkpoint.saveDraft(code);
        const outcome = await run(code, tests, config.waitMs ?? 0);
        const ok = !!outcome.tests?.length && outcome.tests.every(test => test.pass) && !outcome.error;
        if (ok) checkpoint.setDone(true);
    }

    if (error) return <p className="text-red-500 text-sm">{error}</p>;

    return <div className={cn(
        "not-prose my-7 rounded-lg border-2 overflow-hidden transition-colors",
        checkpoint.done ? "border-green-500/60" : "border-cta/40"
    )}>
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-cta/10">
            <div className="flex items-center gap-2 min-w-0">
                {checkpoint.done
                    ? <IoCheckmarkCircle className="text-green-500 shrink-0 text-lg" />
                    : <span className="text-[0.7rem] uppercase tracking-wider text-cta font-semibold shrink-0">Задача</span>}
                <p className="font-medium truncate">{config.title ?? "Твой ред"}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
                {code !== starter && <button type="button" onClick={() => setCode(starter)} className="text-[0.75rem] text-muted-foreground hover:text-foreground flex items-center gap-1">
                    <IoRefresh /> Отначало
                </button>}
                <button
                    type="button"
                    onClick={check}
                    disabled={running}
                    className="text-[0.8rem] bg-main-gradient text-white rounded-md px-3 py-1.5 flex items-center gap-1.5 disabled:opacity-60"
                >
                    <IoPlay /> {running ? "Проверявам..." : "Провери"}
                </button>
            </div>
        </div>

        <CodeEditor value={code} onChange={setCode} language={config.language ?? "javascript"} minRows={6} className="rounded-none" />

        {(result || liveLogs.length > 0) && <div className="p-3 space-y-3 bg-card">
            {result?.tests && result.tests.length > 0 && <ul className="space-y-1.5">
                {result.tests.map((test, index) => (
                    <li key={index} className="flex items-start gap-2 text-[0.85rem]">
                        {test.pass
                            ? <IoCheckmarkCircle className="text-green-500 mt-0.5 shrink-0" />
                            : <IoCloseCircle className="text-red-500 mt-0.5 shrink-0" />}
                        <div className="min-w-0">
                            <p className="font-mono break-words">{test.label}</p>
                            {!test.pass && <p className="text-muted-foreground break-words">
                                {test.error
                                    ? test.error
                                    : <>очаквано: <code>{test.expected}</code> · получено: <code>{test.actual}</code></>}
                            </p>}
                        </div>
                    </li>
                ))}
            </ul>}
            <ConsoleOutput logs={liveLogs} error={result?.error} empty="Кодът не изведе нищо в конзолата." />
        </div>}

        {passed && <p className="px-4 py-3 bg-green-500/10 text-green-600 dark:text-green-400 text-[0.9rem] font-medium">
            Готово. Задачата е решена правилно.
        </p>}

        <div className="flex flex-wrap items-center gap-4 px-4 py-2.5 border-t border-border bg-secondary/50">
            {config.hint && <button type="button" onClick={() => setShowHint(value => !value)} className="text-[0.8rem] text-muted-foreground hover:text-foreground flex items-center gap-1.5">
                <IoBulbOutline /> {showHint ? "Скрий подсказката" : "Подсказка"}
            </button>}
            {solution && attempted && <button type="button" onClick={() => setShowSolution(value => !value)} className="text-[0.8rem] text-muted-foreground hover:text-foreground flex items-center gap-1.5">
                <IoEyeOutline /> {showSolution ? "Скрий решението" : "Виж решението"}
            </button>}
            {solution && !attempted && <span className="text-[0.8rem] text-muted-foreground">Решението се отключва след първи опит.</span>}
        </div>

        {showHint && config.hint && <div className="px-4 py-3 border-t border-border text-[0.9rem] bg-amber-500/5">
            <MarkdownText>{config.hint}</MarkdownText>
        </div>}

        {showSolution && solution && <div className="border-t border-border">
            <p className="px-4 pt-3 pb-1 text-[0.75rem] uppercase tracking-wider text-muted-foreground">Едно възможно решение</p>
            <CodeEditor value={solution} onChange={() => {}} readOnly language={config.language ?? "javascript"} minRows={3} className="rounded-none" />
        </div>}
    </div>
}
