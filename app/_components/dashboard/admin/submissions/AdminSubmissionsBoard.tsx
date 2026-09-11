"use client"

import {useState} from "react";
import {useQueryClient} from "react-query";
import {toast} from "sonner";
import {IoCheckmarkCircle, IoChevronForward, IoHourglassOutline, IoOpenOutline, IoRefreshCircleOutline} from "react-icons/io5";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {getTaskSubmissionsForReview, reviewTaskSubmission} from "@/app/dashboard/admin/actions";
import {TaskSubmissionStatus} from "@/drizzle/schema/task_submissions";
import {FullTaskSubmission} from "@/src/entities/models/media/tasks/full-task-submission";
import CodeEditor from "@/app/_components/dashboard/classroom/module/video/interactive/CodeEditor";
import {cn} from "@/app/_utils/cn";

const FILTERS: {id: TaskSubmissionStatus | "all", label: string}[] = [
    {id: "pending", label: "Чакат преглед"},
    {id: "changes_requested", label: "Върнати"},
    {id: "approved", label: "Приети"},
    {id: "all", label: "Всички"}
];

const STATUS_BADGE: Record<TaskSubmissionStatus, {label: string, className: string, icon: JSX.Element}> = {
    pending: {label: "Чака преглед", className: "bg-amber-500/15 text-amber-600 dark:text-amber-400", icon: <IoHourglassOutline />},
    approved: {label: "Приета", className: "bg-green-500/15 text-green-600 dark:text-green-400", icon: <IoCheckmarkCircle />},
    changes_requested: {label: "Върната", className: "bg-red-500/15 text-red-600 dark:text-red-400", icon: <IoRefreshCircleOutline />}
};

function formatDate(seconds: number) {
    return new Date(seconds * 1000).toLocaleString("bg-BG", {day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"});
}

export default function AdminSubmissionsBoard() {
    const [filter, setFilter] = useState<TaskSubmissionStatus | "all">("pending");
    const [openId, setOpenId] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<Record<string, string>>({});
    const queryClient = useQueryClient();

    const {data: submissionsQuery, isLoading} = useErrorQuery({
        queryFn: () => getTaskSubmissionsForReview(filter === "all" ? {} : {status: filter}),
        queryKey: ["admin-task-submissions", filter]
    });

    const {mutate: review, isLoading: isReviewing} = useErrorMutation({
        mutationFn: (opts: {submissionId: string, status: "approved" | "changes_requested", feedback?: string}) => reviewTaskSubmission(opts),
        onSuccess(_, variables) {
            toast.success(variables.status === "approved" ? "Задачата е приета." : "Задачата е върната за корекция.");
            queryClient.invalidateQueries(["admin-task-submissions"]);
        },
        onError() {
            toast.error("Прегледът не беше записан.");
        }
    });

    const submissions: FullTaskSubmission[] = submissionsQuery?.success ? submissionsQuery.value : [];

    return <div className="overflow-auto pb-10">
        <div className="flex flex-wrap gap-2 mb-4">
            {FILTERS.map(item => (
                <button
                    key={item.id}
                    type="button"
                    onClick={() => setFilter(item.id)}
                    className={cn(
                        "rounded-full px-4 py-1.5 text-[0.85rem] border transition-colors",
                        filter === item.id ? "bg-main-gradient text-white border-transparent" : "border-border hover:border-cta"
                    )}
                >
                    {item.label}
                </button>
            ))}
        </div>

        {isLoading && <p className="text-muted-foreground text-sm">Зареждам...</p>}
        {!isLoading && submissions.length === 0 && <p className="text-muted-foreground text-sm">Няма задачи в тази категория.</p>}

        <ul className="space-y-3">
            {submissions.map(submission => {
                const badge = STATUS_BADGE[submission.status];
                const open = openId === submission.id;

                return <li key={submission.id} className="rounded-lg border border-border overflow-hidden">
                    <button
                        type="button"
                        onClick={() => setOpenId(open ? null : submission.id)}
                        className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-secondary/50 transition-colors"
                    >
                        <IoChevronForward className={cn("mt-1 shrink-0 transition-transform", open && "rotate-90")} />
                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-medium truncate">{submission.profile_name}</span>
                                <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.72rem]", badge.className)}>
                                    {badge.icon} {badge.label}
                                </span>
                            </div>
                            <p className="text-[0.85rem] text-muted-foreground truncate">
                                {submission.module_title} › {submission.section_title} › {submission.video_title}
                            </p>
                            <p className="text-[0.85rem] mt-0.5 truncate">
                                <span className="text-cta">{submission.task_title || submission.task_id}</span>
                                <span className="text-muted-foreground"> · {formatDate(submission.updated_at)}</span>
                            </p>
                        </div>
                    </button>

                    {open && <div className="border-t border-border p-4 space-y-4">
                        {submission.link && <a
                            href={submission.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-cta text-[0.9rem] hover:opacity-80"
                        >
                            <IoOpenOutline /> {submission.link}
                        </a>}

                        <CodeEditor value={submission.content} onChange={() => {}} readOnly minRows={8} />

                        {submission.mentor_feedback && <div className="rounded-md bg-secondary px-3 py-2 text-[0.88rem]">
                            <p className="text-muted-foreground text-[0.75rem] uppercase tracking-wider mb-1">Последна обратна връзка</p>
                            <p className="whitespace-pre-wrap">{submission.mentor_feedback}</p>
                        </div>}

                        <div>
                            <label className="text-[0.8rem] text-muted-foreground mb-1.5 block">
                                Обратна връзка (задължителна при връщане за корекция)
                            </label>
                            <textarea
                                value={feedback[submission.id] ?? ""}
                                onChange={event => setFeedback(prev => ({...prev, [submission.id]: event.target.value}))}
                                rows={4}
                                className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.9rem] focus:outline-none focus:border-cta"
                                placeholder="Какво е добре и какво да поправи..."
                            />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                disabled={isReviewing}
                                onClick={() => review({submissionId: submission.id, status: "approved", feedback: feedback[submission.id]})}
                                className="bg-success-gradient text-white rounded-md px-4 py-2 text-[0.9rem] disabled:opacity-50"
                            >
                                Приемам
                            </button>
                            <button
                                type="button"
                                disabled={isReviewing || !feedback[submission.id]?.trim()}
                                onClick={() => review({submissionId: submission.id, status: "changes_requested", feedback: feedback[submission.id]})}
                                className="bg-red-gradient text-white rounded-md px-4 py-2 text-[0.9rem] disabled:opacity-50"
                            >
                                Върни за корекция
                            </button>
                        </div>
                    </div>}
                </li>
            })}
        </ul>
    </div>
}
