"use client"

import {useLessonInteractivity} from "@/app/_components/dashboard/classroom/module/video/interactive/LessonInteractivityProvider";

export default function LessonProgressBar() {
    const lesson = useLessonInteractivity();
    if (!lesson || lesson.totalCheckpoints === 0) return null;

    const percentage = Math.round((lesson.doneCheckpoints / lesson.totalCheckpoints) * 100);

    return <div className="flex items-center gap-3 mb-4">
        <div className="h-1.5 flex-1 rounded-full bg-secondary overflow-hidden">
            <div
                className="h-full bg-main-gradient transition-all duration-500"
                style={{width: `${percentage}%`}}
            />
        </div>
        <span className="text-[0.75rem] text-muted-foreground shrink-0 tabular-nums">
            {lesson.doneCheckpoints} / {lesson.totalCheckpoints} задачи
        </span>
    </div>
}
