"use client"

import {useState} from "react";
import {IoCheckmarkCircle, IoCloseCircle, IoHelpCircleOutline} from "react-icons/io5";
import {readInteractiveBlock} from "@/app/_utils/interactive/blocks";
import {useCheckpoint} from "@/app/_components/dashboard/classroom/module/video/interactive/LessonInteractivityProvider";
import MarkdownText from "@/app/_components/dashboard/classroom/module/video/interactive/MarkdownText";
import {cn} from "@/app/_utils/cn";

type QuizConfig = {
    id: string,
    question: string,
    options: string[],
    /** Индекс на верния отговор (или няколко, ако въпросът е с повече от един верен). */
    answer: number,
    answers: number[],
    explanation: string
}

export default function Quiz({raw}: {raw: string}) {
    const {config, error} = readInteractiveBlock<QuizConfig>(raw);
    const checkpoint = useCheckpoint(config.id);

    const options = config.options ?? [];
    const correct = config.answers ?? (typeof config.answer === "number" ? [config.answer] : []);
    const multiple = correct.length > 1;

    const [selected, setSelected] = useState<number[]>([]);
    const [checked, setChecked] = useState(false);

    if (error) return <p className="text-red-500 text-sm">{error}</p>;

    const isCorrect = checked
        && selected.length === correct.length
        && selected.every(index => correct.includes(index));

    function toggle(index: number) {
        if (checked) return;
        setSelected(prev => multiple
            ? (prev.includes(index) ? prev.filter(item => item !== index) : [...prev, index])
            : [index]);
    }

    function check() {
        setChecked(true);
        const ok = selected.length === correct.length && selected.every(index => correct.includes(index));
        if (ok) checkpoint.setDone(true);
    }

    return <div className={cn(
        "not-prose my-7 rounded-lg border-2 p-4",
        checkpoint.done ? "border-green-500/60 bg-green-500/5" : "border-border"
    )}>
        <p className="flex items-center gap-2 text-[0.7rem] uppercase tracking-wider font-semibold text-muted-foreground mb-2">
            {checkpoint.done ? <IoCheckmarkCircle className="text-green-500 text-base" /> : <IoHelpCircleOutline className="text-base" />}
            Провери се
        </p>
        <div className="font-medium mb-3 markdown-inner">
            <MarkdownText>{config.question ?? ""}</MarkdownText>
        </div>

        <ul className="space-y-2">
            {options.map((option, index) => {
                const isSelected = selected.includes(index);
                const showCorrect = checked && correct.includes(index);
                const showWrong = checked && isSelected && !correct.includes(index);

                return <li key={index}>
                    <button
                        type="button"
                        onClick={() => toggle(index)}
                        disabled={checked}
                        className={cn(
                            "w-full text-left flex items-start gap-2.5 rounded-md border px-3 py-2 text-[0.92rem] transition-colors",
                            !checked && "hover:border-cta cursor-pointer",
                            isSelected && !checked && "border-cta bg-cta/5",
                            !isSelected && !checked && "border-border",
                            showCorrect && "border-green-500 bg-green-500/10",
                            showWrong && "border-red-500 bg-red-500/10",
                            checked && !showCorrect && !showWrong && "border-border opacity-60"
                        )}
                    >
                        <span className={cn(
                            "mt-0.5 shrink-0 w-4 h-4 rounded-full border flex items-center justify-center text-[0.6rem]",
                            isSelected ? "border-cta bg-cta text-white" : "border-muted-foreground"
                        )}>
                            {String.fromCharCode(1040 + index)}
                        </span>
                        <span className="min-w-0 markdown-inner"><MarkdownText>{option}</MarkdownText></span>
                        {showCorrect && <IoCheckmarkCircle className="ml-auto text-green-500 shrink-0 mt-0.5" />}
                        {showWrong && <IoCloseCircle className="ml-auto text-red-500 shrink-0 mt-0.5" />}
                    </button>
                </li>
            })}
        </ul>

        <div className="flex items-center gap-3 mt-3">
            {!checked && <button
                type="button"
                onClick={check}
                disabled={selected.length === 0}
                className="text-[0.85rem] bg-main-gradient text-white rounded-md px-4 py-1.5 disabled:opacity-50"
            >
                Провери
            </button>}
            {checked && !isCorrect && <button
                type="button"
                onClick={() => { setChecked(false); setSelected([]); }}
                className="text-[0.85rem] rounded-md px-4 py-1.5 border border-border hover:border-cta"
            >
                Опитай пак
            </button>}
            {multiple && !checked && <span className="text-[0.78rem] text-muted-foreground">Възможни са повече от един верни отговора.</span>}
        </div>

        {checked && <div className={cn(
            "mt-3 rounded-md px-3 py-2 text-[0.9rem]",
            isCorrect ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-red-500/10 text-red-600 dark:text-red-400"
        )}>
            <p className="font-medium mb-1">{isCorrect ? "Вярно." : "Не е вярно."}</p>
            {config.explanation && <div className="markdown-inner text-foreground/80">
                <MarkdownText>{config.explanation}</MarkdownText>
            </div>}
        </div>}
    </div>
}
