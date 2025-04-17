"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import Markdown from "markdown-to-jsx";
import {ComponentProps} from "react";

type DashboardModuleVideoInfoProps = {
    title: string
    descriptionMarkdown: string
}

export default function DashboardModuleVideoInfo({title, descriptionMarkdown}: DashboardModuleVideoInfoProps) {
    return <Card className="rounded-sm mt-3 dashboard-module-video-info markdown">
        <CardHeader>
            <CardTitle className="text-2xl">
                {title}
            </CardTitle>
            <CardDescription>
                Допълнителна информация
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Markdown
                options={{
                    overrides: {
                        a: (props: ComponentProps<"a">) => <a target="_blank" {...props} />
                    }
                }}
            >
                {descriptionMarkdown}
            </Markdown>
        </CardContent>
    </Card>
}