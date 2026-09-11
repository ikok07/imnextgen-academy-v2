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
    template: "react" | "vanilla",
    height: number,
    showConsole: boolean,
    dependencies: Record<string, string>,
    editorWidth: number
}

const DEFAULT_FILE = "/App.js";
const DEFAULT_VANILLA_FILE = "/index.js";

/** Всяка част на блока може да започва с "// file: /Име.js", иначе е /App.js */
function partsToFiles(parts: string[], template: SandboxConfig["template"]): Record<string, string> {
    const entryFile = template === "vanilla" ? DEFAULT_VANILLA_FILE : DEFAULT_FILE;
    const files: Record<string, string> = {};
    parts.forEach((part, index) => {
        const match = part.match(/^\/\/\s*file:\s*(\S+)\s*\n/);
        if (match) {
            files[match[1]] = part.slice(match[0].length);
        } else {
            files[index === 0 ? entryFile : `/file-${index}.js`] = part;
        }
    });
    return files;
}

export default function ReactSandbox({raw}: {raw: string}) {
    const {config, parts} = readInteractiveBlock<SandboxConfig>(raw);
    const {resolvedTheme} = useTheme();
    const files = partsToFiles(parts, config.template ?? "react");

    // На широк екран блокът излиза извън колоната на статията, за да има място за редактора и прегледа.
    return <div className="not-prose my-7 lg:-mx-10 xl:-mx-24">
        {config.title && <p className="text-[0.8rem] uppercase tracking-wider text-muted-foreground mb-2">{config.title}</p>}
        <Sandpack
            template={config.template === "vanilla" ? "vanilla" : "react"}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            files={files}
            customSetup={config.dependencies ? {dependencies: config.dependencies} : undefined}
            options={{
                editorHeight: config.height ?? 380,
                showLineNumbers: true,
                showTabs: Object.keys(files).length > 1,
                showConsole: config.showConsole ?? false,
                editorWidthPercentage: config.editorWidth ?? 58
            }}
        />
    </div>
}
