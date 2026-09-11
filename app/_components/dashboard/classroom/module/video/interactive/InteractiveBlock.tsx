"use client"

import {InteractiveBlockType} from "@/app/_utils/interactive/blocks";
import Quiz from "@/app/_components/dashboard/classroom/module/video/interactive/Quiz";
import RunnableCode from "@/app/_components/dashboard/classroom/module/video/interactive/RunnableCode";
import CodeTask from "@/app/_components/dashboard/classroom/module/video/interactive/CodeTask";
import ReactSandbox from "@/app/_components/dashboard/classroom/module/video/interactive/ReactSandbox";
import TaskSubmission from "@/app/_components/dashboard/classroom/module/video/interactive/TaskSubmission";
import Callout from "@/app/_components/dashboard/classroom/module/video/interactive/Callout";
import Reveal from "@/app/_components/dashboard/classroom/module/video/interactive/Reveal";
import Steps from "@/app/_components/dashboard/classroom/module/video/interactive/Steps";
import Takeaways from "@/app/_components/dashboard/classroom/module/video/interactive/Takeaways";

type InteractiveBlockProps = {
    type: InteractiveBlockType,
    raw: string
}

export default function InteractiveBlock({type, raw}: InteractiveBlockProps) {
    switch (type) {
        case "quiz": return <Quiz raw={raw} />;
        case "run": return <RunnableCode raw={raw} />;
        case "task": return <CodeTask raw={raw} />;
        case "sandbox": return <ReactSandbox raw={raw} />;
        case "submit": return <TaskSubmission raw={raw} />;
        case "callout": return <Callout raw={raw} />;
        case "reveal": return <Reveal raw={raw} />;
        case "steps": return <Steps raw={raw} />;
        case "takeaways": return <Takeaways raw={raw} />;
        default: return null;
    }
}
