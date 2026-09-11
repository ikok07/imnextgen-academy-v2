/**
 * Проверява уроците в docs/content:
 *  - валиден JSON във всеки интерактивен блок
 *  - куизовете имат отговор в границите на опциите
 *  - решението на всяка задача наистина минава собствените си тестове
 *
 *   node docs/scripts/check-content.mjs
 */

import * as fs from "node:fs";
import * as path from "node:path";

const ROOT = path.join(process.cwd(), "docs", "content");
const problems = [];

function walk(dir) {
    return fs.readdirSync(dir, {withFileTypes: true}).flatMap(entry => {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) return walk(full);
        if (entry.name === "README.md" || entry.name.startsWith("_")) return [];
        return entry.name.endsWith(".md") ? [full] : [];
    });
}

function blocks(markdown) {
    const found = [];
    const regex = /^```(quiz|task|run|sandbox|submit|callout|reveal|steps|takeaways)[ \t]*\n([\s\S]*?)\n```$/gm;
    let match;
    while ((match = regex.exec(markdown)) !== null) {
        found.push({type: match[1], body: match[2]});
    }
    return found;
}

function splitParts(raw) {
    return raw.replace(/\r\n/g, "\n").split(/^[ \t]*---[ \t]*$/m).map(part => part.replace(/^\n+/, "").replace(/\s+$/, ""));
}

function readBlock(raw) {
    const parts = splitParts(raw);
    if (parts.length > 0 && parts[0].trim().startsWith("{")) {
        return {config: JSON.parse(parts[0]), parts: parts.slice(1)};
    }
    return {config: {}, parts};
}

function deepEqual(a, b) {
    if (a === b) return true;
    if (typeof a === "number" && typeof b === "number" && Number.isNaN(a) && Number.isNaN(b)) return true;
    if (a === null || b === null || typeof a !== "object" || typeof b !== "object") return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    if (a instanceof Set && b instanceof Set) return deepEqual([...a].sort(), [...b].sort());
    if (a instanceof Map && b instanceof Map) return deepEqual([...a.entries()], [...b.entries()]);
    const aKeys = Object.keys(a), bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every(key => deepEqual(a[key], b[key]));
}

async function runTask(file, config, code) {
    const specs = config.tests ?? [];
    const source = `
        return (async function () {
            const __logs = [];
            const console = {
                log: (...args) => __logs.push(args.map(String).join(" ")),
                info: (...args) => __logs.push(args.map(String).join(" ")),
                warn: (...args) => __logs.push(args.map(String).join(" ")),
                error: (...args) => __logs.push(args.map(String).join(" "))
            };
            ${code}
            const __results = [];
            for (const spec of __specs) {
                try {
                    if (spec.call) {
                        const actual = await eval(spec.call);
                        __results.push({spec, actual, ok: "expect" in spec ? __deepEqual(actual, spec.expect) : actual !== undefined});
                    } else if (spec.logsInclude) {
                        const joined = __logs.join("\\n");
                        const missing = spec.logsInclude.filter(needle => !joined.includes(needle));
                        __results.push({spec, actual: joined, ok: missing.length === 0});
                    }
                } catch (error) {
                    __results.push({spec, error: String(error), ok: false});
                }
            }
            return __results;
        })();
    `;

    try {
        const runner = new Function("__specs", "__deepEqual", source);
        const results = await runner(specs, deepEqual);
        results.filter(result => !result.ok).forEach(result => {
            problems.push(`${file} :: задача "${config.title ?? config.id}" :: тест "${result.spec.label ?? result.spec.call}" не минава (${result.error ?? `получено ${JSON.stringify(result.actual)}, очаквано ${JSON.stringify(result.spec.expect)}`})`);
        });
        if (specs.length === 0) problems.push(`${file} :: задача "${config.title ?? config.id}" няма тестове`);
    } catch (error) {
        problems.push(`${file} :: задача "${config.title ?? config.id}" :: решението не се изпълнява (${error})`);
    }
}

const files = fs.existsSync(ROOT) ? walk(ROOT) : [];
const seenIds = new Map();
const seenLabels = new Map();

for (const file of files) {
    const relative = path.relative(process.cwd(), file);
    const raw = fs.readFileSync(file, "utf8");

    const labelMatch = raw.match(/^label:\s*"?([^"\n]+)"?\s*$/m);
    if (labelMatch) {
        const label = labelMatch[1].trim();
        if (seenLabels.has(label)) problems.push(`${relative} :: label "${label}" се повтаря (вече е в ${seenLabels.get(label)})`);
        seenLabels.set(label, relative);
    } else {
        problems.push(`${relative} :: липсва label във frontmatter`);
    }

    for (const block of blocks(raw)) {
        let parsed;
        try {
            parsed = readBlock(block.body);
        } catch (error) {
            problems.push(`${relative} :: блок "${block.type}" има невалиден JSON: ${error.message}`);
            continue;
        }

        const {config, parts} = parsed;

        if (["callout", "reveal", "takeaways", "steps"].includes(block.type)) {
            const nested = block.body.split("\n").some(line => line.trimStart().startsWith("```"));
            if (nested) problems.push(`${relative} :: блок "${block.type}" съдържа вложен код блок - това прекъсва външния блок при рендиране`);
        }

        if (["quiz", "task", "submit"].includes(block.type)) {
            if (!config.id) {
                problems.push(`${relative} :: блок "${block.type}" няма id`);
            } else {
                if (seenIds.has(config.id)) problems.push(`${relative} :: id "${config.id}" се повтаря (вече е в ${seenIds.get(config.id)})`);
                seenIds.set(config.id, relative);
            }
        }

        if (block.type === "quiz") {
            const options = config.options ?? [];
            const answers = config.answers ?? (typeof config.answer === "number" ? [config.answer] : []);
            if (options.length < 2) problems.push(`${relative} :: куиз "${config.id}" има по-малко от 2 опции`);
            if (answers.length === 0) problems.push(`${relative} :: куиз "${config.id}" няма верен отговор`);
            answers.forEach(index => {
                if (index < 0 || index >= options.length) problems.push(`${relative} :: куиз "${config.id}" сочи несъществуваща опция ${index}`);
            });
            if (!config.explanation) problems.push(`${relative} :: куиз "${config.id}" няма обяснение`);
        }

        if (block.type === "task") {
            const solution = parts[1];
            if (!solution) {
                problems.push(`${relative} :: задача "${config.id}" няма решение (втора част след ---)`);
            } else {
                await runTask(relative, config, solution);
            }
        }
    }
}

console.log(`Проверени файлове: ${files.length}`);
if (problems.length === 0) {
    console.log("Всичко е наред.");
} else {
    console.log(`\nНамерени проблеми (${problems.length}):`);
    problems.forEach(problem => console.log(" - " + problem));
    process.exit(1);
}
