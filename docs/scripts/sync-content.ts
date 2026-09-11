/**
 * Качва уроците-статии от docs/content в базата.
 *
 *   npx tsx docs/scripts/sync-content.ts            # само показва какво би направил
 *   npx tsx docs/scripts/sync-content.ts --apply    # записва в базата
 *   npx tsx docs/scripts/sync-content.ts --apply --only=module-3
 *
 * Всеки файл е един урок. Съответствието с базата е по "label" на описанието,
 * затова преименуване на урок не създава дубликат.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import {config} from "dotenv";
import postgres from "postgres";

config({path: ".env.local"});

const CONTENT_ROOT = path.join(process.cwd(), "docs", "content");
const APPLY = process.argv.includes("--apply");
const ONLY = process.argv.find(arg => arg.startsWith("--only="))?.slice("--only=".length);

type Frontmatter = {
    module: string,
    section: string,
    sectionOrder: string,
    title: string,
    label: string,
    sectionId?: string
}

type Lesson = {
    file: string,
    front: Frontmatter,
    markdown: string,
    order: number
}

function parseFrontmatter(raw: string, file: string): {front: Frontmatter, body: string} {
    const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!match) throw new Error(`Липсва frontmatter в ${file}`);

    const front: Record<string, string> = {};
    match[1].split("\n").forEach(line => {
        const separator = line.indexOf(":");
        if (separator === -1) return;
        const key = line.slice(0, separator).trim();
        const value = line.slice(separator + 1).trim()
            .replace(/^["']|["']$/g, "")
            .replace(/\\"/g, '"');
        front[key] = value;
    });

    const required = ["module", "section", "sectionOrder", "title", "label"];
    required.forEach(key => {
        if (!front[key]) throw new Error(`Липсва "${key}" в frontmatter на ${file}`);
    });

    return {front: front as Frontmatter, body: raw.slice(match[0].length).trim()};
}

function collectLessons(): Lesson[] {
    if (!fs.existsSync(CONTENT_ROOT)) throw new Error(`Няма папка ${CONTENT_ROOT}`);

    const lessons: Lesson[] = [];
    const walk = (dir: string) => {
        fs.readdirSync(dir, {withFileTypes: true}).forEach(entry => {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) return walk(full);
            if (!entry.name.endsWith(".md")) return;

            const relative = path.relative(CONTENT_ROOT, full);
            if (ONLY && !relative.startsWith(ONLY)) return;

            const raw = fs.readFileSync(full, "utf8");
            const {front, body} = parseFrontmatter(raw, relative);
            const orderMatch = entry.name.match(/^(\d+)/);
            if (!orderMatch) throw new Error(`Името на ${relative} трябва да започва с номер, напр. 03-props.md`);

            lessons.push({file: relative, front, markdown: body, order: Number(orderMatch[1])});
        });
    };
    walk(CONTENT_ROOT);

    return lessons.sort((a, b) => {
        const sectionDiff = Number(a.front.sectionOrder) - Number(b.front.sectionOrder);
        return sectionDiff !== 0 ? sectionDiff : a.order - b.order;
    });
}

async function main() {
    const lessons = collectLessons();
    if (lessons.length === 0) {
        console.log("Няма намерени уроци.");
        return;
    }

    const sql = postgres(process.env.DATABASE_URL!, {ssl: "require"});
    const created: string[] = [];
    const updated: string[] = [];

    try {
        const moduleTitles = Array.from(new Set(lessons.map(lesson => lesson.front.module)));

        for (const moduleTitle of moduleTitles) {
            const [module] = await sql`select id, title from modules where title = ${moduleTitle}`;
            if (!module) throw new Error(`Няма модул с заглавие "${moduleTitle}" в базата.`);

            const moduleLessons = lessons.filter(lesson => lesson.front.module === moduleTitle);
            const [{max}] = await sql`
                select coalesce(max(v.order_number), -1) as max
                from videos v join sections s on s.id = v.section_id
                where s.module_id = ${module.id}
            `;
            let nextOrder = Number(max) + 1;

            console.log(`\n=== ${moduleTitle} (${moduleLessons.length} урока)`);

            const sectionTitles = Array.from(new Set(moduleLessons.map(lesson => lesson.front.section)));
            for (const sectionTitle of sectionTitles) {
                const sectionLessons = moduleLessons.filter(lesson => lesson.front.section === sectionTitle);
                const sectionOrder = Number(sectionLessons[0].front.sectionOrder);
                const explicitId = sectionLessons[0].front.sectionId;

                let [section] = explicitId
                    ? await sql`select id, title from sections where id = ${explicitId}`
                    : await sql`select id, title from sections where module_id = ${module.id} and title = ${sectionTitle}`;

                if (!section) {
                    console.log(`  + секция "${sectionTitle}" (order ${sectionOrder})`);
                    if (APPLY) {
                        [section] = await sql`
                            insert into sections (module_id, title, order_number)
                            values (${module.id}, ${sectionTitle}, ${sectionOrder})
                            returning id, title
                        `;
                    } else {
                        section = {id: `(нова секция ${sectionTitle})`, title: sectionTitle};
                    }
                } else if (section.title !== sectionTitle) {
                    console.log(`  ~ секция преименувана: "${section.title}" -> "${sectionTitle}"`);
                    if (APPLY) await sql`update sections set title = ${sectionTitle}, order_number = ${sectionOrder} where id = ${section.id}`;
                }

                for (const lesson of sectionLessons) {
                    const [description] = await sql`select id from video_descriptions where label = ${lesson.front.label}`;

                    let descriptionId = description?.id;
                    if (!descriptionId) {
                        if (APPLY) {
                            const [row] = await sql`
                                insert into video_descriptions (label, markdown)
                                values (${lesson.front.label}, ${lesson.markdown})
                                returning id
                            `;
                            descriptionId = row.id;
                        }
                    } else if (APPLY) {
                        await sql`update video_descriptions set markdown = ${lesson.markdown} where id = ${descriptionId}`;
                    }

                    const [existingVideo] = descriptionId
                        ? await sql`select id, title, order_number from videos where description_id = ${descriptionId}`
                        : [];

                    if (existingVideo) {
                        updated.push(lesson.front.label);
                        console.log(`  ~ ${lesson.front.title}`);
                        if (APPLY && existingVideo.title !== lesson.front.title) {
                            await sql`update videos set title = ${lesson.front.title} where id = ${existingVideo.id}`;
                        }
                    } else {
                        created.push(lesson.front.label);
                        console.log(`  + ${lesson.front.title} (order ${nextOrder})`);
                        if (APPLY) {
                            await sql`
                                insert into videos (section_id, title, order_number, description_id)
                                values (${section.id}, ${lesson.front.title}, ${nextOrder}, ${descriptionId})
                            `;
                        }
                        nextOrder++;
                    }
                }
            }
        }

        console.log(`\n${APPLY ? "Записано" : "Проба (нищо не е записано)"}: ${created.length} нови, ${updated.length} обновени.`);
        if (!APPLY) console.log("Пусни със --apply, за да влезе в базата.");
    } finally {
        await sql.end();
    }
}

main().catch(error => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
});
