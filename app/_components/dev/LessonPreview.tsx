"use client"

import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import DashboardModuleVideoDescription
    from "@/app/_components/dashboard/classroom/module/video/DashboardModuleVideoDescription";
import LessonInteractivityProvider
    from "@/app/_components/dashboard/classroom/module/video/interactive/LessonInteractivityProvider";
import LessonProgressBar
    from "@/app/_components/dashboard/classroom/module/video/interactive/LessonProgressBar";

type LessonPreviewProps = {
    files: string[],
    selected: string,
    title: string,
    markdown: string
}

export default function LessonPreview({files, selected, title, markdown}: LessonPreviewProps) {
    return <div className="grid md:grid-cols-[18rem_1fr] gap-4 p-4">
        <aside className="text-[0.85rem] space-y-1 md:sticky md:top-4 md:self-start">
            {files.map(file => (
                <Link
                    key={file}
                    href={`/dev/lesson-preview?file=${encodeURIComponent(file)}`}
                    className={`block rounded px-2 py-1 truncate ${file === selected ? "bg-main-gradient text-white" : "hover:bg-secondary"}`}
                >
                    {file}
                </Link>
            ))}
        </aside>

        <Card className="rounded-sm markdown max-w-[44rem] w-full">
            <CardHeader>
                <CardTitle className="text-2xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <LessonInteractivityProvider lessonId={`preview:${selected}`}>
                    <LessonProgressBar />
                    <DashboardModuleVideoDescription description={markdown} />
                </LessonInteractivityProvider>
            </CardContent>
        </Card>
    </div>
}
