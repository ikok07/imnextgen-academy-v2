"use client"

import dynamic from "next/dynamic";
import {useTheme} from "next-themes";
import {readInteractiveBlock} from "@/app/_utils/interactive/blocks";

const Sandpack = dynamic(
    () => import("@codesandbox/sandpack-react").then(mod => mod.Sandpack),
    {
        ssr: false,
        loading: () => <div className="h-64 rounded-lg border border-border bg-secondary/40 animate-pulse flex items-center justify-center text-sm text-muted-foreground">
            Зарежда се редакторът...
        </div>
    }
);

type SandboxConfig = {
    title: string,
    height: number,
    showConsole: boolean,
    dependencies: Record<string, string>
}

const DEFAULT_FILE = "/App.js";

/** Всяка част на блока може да започва с "// file: /Име.js", иначе е /App.js */
function partsToFiles(parts: string[]): Record<string, string> {
    const files: Record<string, string> = {};
    parts.forEach((part, index) => {
        const match = part.match(/^\/\/\s*file:\s*(\S+)\s*\n/);
        if (match) {
            files[match[1]] = part.slice(match[0].length);
        } else {
            files[index === 0 ? DEFAULT_FILE : `/File${index}.js`] = part;
        }
    });
    return files;
}

export default function ReactSandbox({raw}: {raw: string}) {
    const {config, parts} = readInteractiveBlock<SandboxConfig>(raw);
    const {resolvedTheme} = useTheme();
    const files = partsToFiles(parts);

    return <div className="not-prose my-7">
        {config.title && <p className="text-[0.8rem] uppercase tracking-wider text-muted-foreground mb-2">{config.title}</p>}
        <Sandpack
            template="react"
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            files={files}
            customSetup={config.dependencies ? {dependencies: config.dependencies} : undefined}
            options={{
                editorHeight: config.height ?? 380,
                showLineNumbers: true,
                showTabs: Object.keys(files).length > 1,
                showConsole: config.showConsole ?? false
            }}
        />
    </div>
}
