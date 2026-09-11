/**
 * Интерактивните блокове в уроците се пишат като ограден код блок (fenced block),
 * чийто "език" е името на блока. Тялото се разделя на части с редове само от "---".
 *
 * ```task
 * {"id": "map-1", "title": "Удвои числата"}
 * ---
 * function double(arr) {}
 * ---
 * function double(arr) { return arr.map(n => n * 2); }
 * ```
 */

export const INTERACTIVE_BLOCKS = [
    "quiz",
    "run",
    "task",
    "sandbox",
    "submit",
    "callout",
    "reveal",
    "steps",
    "takeaways"
] as const;

export type InteractiveBlockType = typeof INTERACTIVE_BLOCKS[number];

export function isInteractiveBlock(lang: string | undefined): lang is InteractiveBlockType {
    return !!lang && (INTERACTIVE_BLOCKS as readonly string[]).includes(lang);
}

/** Езикът на блока идва като className="lang-<нещо>" от markdown-to-jsx. */
export function languageFromClassName(className: string | undefined): string {
    if (!className) return "javascript";
    const match = className.split(/\s+/).find(c => c.startsWith("lang-"));
    return match ? match.slice("lang-".length) : "javascript";
}

/** Разделя тялото на блока по редове, съдържащи единствено "---". */
export function splitBlockParts(raw: string): string[] {
    return raw
        .replace(/\r\n/g, "\n")
        .split(/^[ \t]*---[ \t]*$/m)
        .map(part => part.replace(/^\n+/, "").replace(/\s+$/, ""));
}

/** Първата част на блока е JSON конфигурация. Никога не хвърля - грешният JSON се показва в урока. */
export function parseBlockConfig<T extends object>(raw: string | undefined): { config: Partial<T>, error?: string } {
    if (!raw || !raw.trim()) return {config: {}};
    try {
        return {config: JSON.parse(raw) as Partial<T>};
    } catch (e) {
        return {config: {}, error: `Невалидна конфигурация на блока: ${e instanceof Error ? e.message : String(e)}`};
    }
}

/**
 * Прочита цял интерактивен блок: ако първата част започва с "{", тя е конфигурация,
 * а останалите части са съдържание (код, решение, текст).
 */
export function readInteractiveBlock<T extends object>(raw: string): { config: Partial<T>, parts: string[], error?: string } {
    const parts = splitBlockParts(raw);
    if (parts.length > 0 && parts[0].trim().startsWith("{")) {
        const {config, error} = parseBlockConfig<T>(parts[0]);
        return {config, parts: parts.slice(1), error};
    }
    return {config: {}, parts};
}
