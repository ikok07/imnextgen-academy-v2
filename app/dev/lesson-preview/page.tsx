import * as fs from "node:fs";
import * as path from "node:path";
import {notFound} from "next/navigation";
import LessonPreview from "@/app/_components/dev/LessonPreview";

/**
 * Преглед на уроците от docs/content, без да са качени в базата.
 * Съществува само в режим на разработка.
 */
export default function Page({searchParams}: {searchParams: {file?: string}}) {
    if (process.env.NODE_ENV !== "development") notFound();

    const root = path.join(process.cwd(), "docs", "content");

    const files: string[] = [];
    const walk = (dir: string) => {
        if (!fs.existsSync(dir)) return;
        fs.readdirSync(dir, {withFileTypes: true}).forEach(entry => {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) return walk(full);
            if (entry.name.endsWith(".md")) files.push(path.relative(root, full));
        });
    };
    walk(root);
    files.sort();

    const selected = searchParams.file && files.includes(searchParams.file) ? searchParams.file : files[0];
    if (!selected) return <p className="p-6">Няма уроци в docs/content.</p>;

    const raw = fs.readFileSync(path.join(root, selected), "utf8");
    const body = raw.replace(/^---\n[\s\S]*?\n---\n?/, "");
    const title = raw.match(/^title:\s*"?(.+?)"?\s*$/m)?.[1]?.replace(/\\"/g, '"') ?? selected;

    return <LessonPreview files={files} selected={selected} title={title} markdown={body} />
}
