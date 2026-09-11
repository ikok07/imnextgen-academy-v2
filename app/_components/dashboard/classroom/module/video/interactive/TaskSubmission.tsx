"use client"

import {useEffect, useState} from "react";
import {useQueryClient} from "react-query";
import {toast} from "sonner";
import {IoCheckmarkCircle, IoCloudUploadOutline, IoHourglassOutline, IoRefreshCircleOutline} from "react-icons/io5";
import CodeEditor from "@/app/_components/dashboard/classroom/module/video/interactive/CodeEditor";
import MarkdownText from "@/app/_components/dashboard/classroom/module/video/interactive/MarkdownText";
import {useCheckpoint, useLessonInteractivity} from "@/app/_components/dashboard/classroom/module/video/interactive/LessonInteractivityProvider";
import {readInteractiveBlock} from "@/app/_utils/interactive/blocks";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {getTaskSubmissionsForVideo, submitTask} from "@/app/dashboard/actions";
import {TaskSubmission as TaskSubmissionRow} from "@/drizzle/schema/task_submissions";
import {cn} from "@/app/_utils/cn";

type SubmitConfig = {
    id: string,
    title: string,
    language: "javascript" | "jsx",
    requirements: string[],
    askForLink: boolean,
    linkLabel: string
}

const STATUS_VIEW = {
    pending: {
        icon: <IoHourglassOutline className="text-amber-500" />,
        label: "Предадена - чака преглед от ментор",
        className: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
    },
    approved: {
        icon: <IoCheckmarkCircle className="text-green-500" />,
        label: "Приета от ментор",
        className: "bg-green-500/10 text-green-600 dark:text-green-400"
    },
    changes_requested: {
        icon: <IoRefreshCircleOutline className="text-red-500" />,
        label: "Върната за корекция",
        className: "bg-red-500/10 text-red-600 dark:text-red-400"
    }
} as const;

export default function TaskSubmission({raw}: {raw: string}) {
    const {config, parts} = readInteractiveBlock<SubmitConfig>(raw);
    const lesson = useLessonInteractivity();
    const checkpoint = useCheckpoint(config.id);
    const queryClient = useQueryClient();

    const starter = parts[0] ?? "";
    const [code, setCode] = useState(starter);
    const [link, setLink] = useState("");
    const [restored, setRestored] = useState(false);

    const {data: submissionsQuery, isLoading} = useErrorQuery({
        queryFn: () => getTaskSubmissionsForVideo(lesson?.lessonId),
        queryKey: ["task-submissions", lesson?.lessonId],
        enabled: !!lesson?.lessonId
    });

    const submission: TaskSubmissionRow | undefined = submissionsQuery?.success
        ? submissionsQuery.value.find(item => item.task_id === config.id)
        : undefined;

    useEffect(() => {
        if (restored) return;
        if (submission) {
            setCode(submission.content);
            setLink(submission.link ?? "");
            setRestored(true);
            return;
        }
        if (checkpoint.loaded && checkpoint.draft) {
            setCode(checkpoint.draft);
            setRestored(true);
        }
    }, [submission, checkpoint.loaded, checkpoint.draft, restored]);

    useEffect(() => {
        if (submission?.status === "approved") checkpoint.setDone(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submission?.status]);

    const {mutate: send, isLoading: isSending} = useErrorMutation({
        mutationFn: () => submitTask({
            videoId: lesson?.lessonId,
            taskId: config.id,
            taskTitle: config.title ?? "",
            content: code,
            link: link || undefined
        }),
        onSuccess() {
            toast.success("Задачата е предадена. Ментор ще я прегледа.");
            queryClient.invalidateQueries(["task-submissions"]);
        },
        onError() {
            toast.error("Задачата не беше предадена. Опитай пак след малко.");
        }
    });

    const status = submission ? STATUS_VIEW[submission.status] : undefined;
    const dirty = !submission || submission.content !== code || (submission.link ?? "") !== link;

    return <div className={cn(
        "not-prose my-8 rounded-lg border-2 overflow-hidden",
        submission?.status === "approved" ? "border-green-500/60" : "border-cta/50"
    )}>
        <div className="px-4 py-3 bg-cta/10">
            <p className="text-[0.7rem] uppercase tracking-wider text-cta font-semibold">Задача за преглед от ментор</p>
            <p className="font-semibold text-[1.05rem] mt-0.5">{config.title ?? "Предай задачата"}</p>
        </div>

        {config.requirements && config.requirements.length > 0 && <ul className="px-4 py-3 space-y-1.5 border-b border-border text-[0.92rem]">
            {config.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-2">
                    <span className="text-cta mt-0.5">▸</span>
                    <span className="min-w-0 markdown-inner"><MarkdownText>{requirement}</MarkdownText></span>
                </li>
            ))}
        </ul>}

        {status && <div className={cn("flex items-start gap-2 px-4 py-2.5 text-[0.9rem]", status.className)}>
            <span className="text-lg leading-none mt-0.5">{status.icon}</span>
            <div className="min-w-0">
                <p className="font-medium">{status.label}</p>
                {submission?.mentor_feedback && <div className="text-foreground/80 mt-1 markdown-inner">
                    <MarkdownText>{submission.mentor_feedback}</MarkdownText>
                </div>}
            </div>
        </div>}

        <div className="p-4 space-y-3">
            <div>
                <p className="text-[0.8rem] text-muted-foreground mb-1.5">Твоето решение</p>
                <CodeEditor
                    value={code}
                    onChange={value => { setCode(value); checkpoint.saveDraft(value); }}
                    language={config.language ?? "javascript"}
                    minRows={8}
                />
            </div>

            {config.askForLink !== false && <div>
                <label className="text-[0.8rem] text-muted-foreground mb-1.5 block">
                    {config.linkLabel ?? "Линк към GitHub / живата версия (по желание)"}
                </label>
                <input
                    type="url"
                    value={link}
                    onChange={event => setLink(event.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.9rem] focus:outline-none focus:border-cta"
                />
            </div>}

            <button
                type="button"
                onClick={() => send()}
                disabled={isSending || isLoading || !code.trim() || (!!submission && !dirty)}
                className="bg-main-gradient text-white rounded-md px-4 py-2 text-[0.9rem] flex items-center gap-2 disabled:opacity-50"
            >
                <IoCloudUploadOutline />
                {isSending ? "Изпращам..." : submission ? "Предай отново" : "Предай за преглед"}
            </button>
            {submission && !dirty && <p className="text-[0.78rem] text-muted-foreground">
                Промени решението, за да го предадеш отново.
            </p>}
        </div>
    </div>
}
