"use client"

import {useCallback, useEffect, useRef, useState} from "react";

export type SandboxLog = {
    level: "log" | "info" | "warn" | "error",
    text: string
}

export type SandboxTestSpec = {
    /** Израз, който се изпълнява след кода на курсиста, напр. "double([1, 2])" */
    call?: string,
    /** Очакваният резултат от израза (сравнява се дълбоко). */
    expect?: unknown,
    /** Текстове, които трябва да се появят в конзолата. */
    logsInclude?: string[],
    /** Какво да пише пред теста в списъка с резултати. */
    label?: string
}

export type SandboxTestResult = {
    label: string,
    pass: boolean,
    expected?: string,
    actual?: string,
    error?: string
}

export type SandboxRunResult = {
    logs: SandboxLog[],
    error?: string,
    tests?: SandboxTestResult[],
    timedOut?: boolean
}

const RUN_TIMEOUT_MS = 6000;

/** Кодът на курсиста се изпълнява в iframe без достъп до нашия origin. */
function buildDocument(runId: string, userCode: string, tests: SandboxTestSpec[], waitMs: number) {
    const safeCode = userCode.replace(/<\/script/gi, "<\\/script");
    const testsJson = JSON.stringify(tests).replace(/<\/script/gi, "<\\/script");

    return `<!doctype html><html><head><meta charset="utf-8"></head><body><script>
(function(){
  var RUN_ID = ${JSON.stringify(runId)};
  var logs = [];
  function send(payload){ try { parent.postMessage(Object.assign({__imngSandbox: RUN_ID}, payload), "*"); } catch(e) {} }
  function fmt(value, depth){
    depth = depth || 0;
    if (value === null) return "null";
    if (value === undefined) return "undefined";
    var type = typeof value;
    if (type === "string") return depth === 0 ? value : '"' + value + '"';
    if (type === "number" || type === "boolean" || type === "bigint") return String(value);
    if (type === "function") return value.name ? "ƒ " + value.name + "()" : "ƒ ()";
    if (type === "symbol") return value.toString();
    if (value instanceof Error) return value.name + ": " + value.message;
    if (value instanceof Date) return value.toISOString();
    if (value instanceof Map) return "Map(" + value.size + ") {" + Array.from(value.entries()).map(function(e){ return fmt(e[0], depth+1) + " => " + fmt(e[1], depth+1); }).join(", ") + "}";
    if (value instanceof Set) return "Set(" + value.size + ") {" + Array.from(value.values()).map(function(v){ return fmt(v, depth+1); }).join(", ") + "}";
    if (Array.isArray(value)) {
      if (depth > 3) return "[...]";
      return "[" + value.map(function(v){ return fmt(v, depth+1); }).join(", ") + "]";
    }
    if (type === "object") {
      if (depth > 3) return "{...}";
      var keys = Object.keys(value);
      if (keys.length === 0) return "{}";
      return "{ " + keys.map(function(k){ return k + ": " + fmt(value[k], depth+1); }).join(", ") + " }";
    }
    return String(value);
  }
  ["log", "info", "warn", "error"].forEach(function(level){
    console[level] = function(){
      var text = Array.prototype.slice.call(arguments).map(function(a){ return fmt(a, 0); }).join(" ");
      logs.push({level: level, text: text});
      send({type: "log", entry: {level: level, text: text}});
    };
  });
  function deepEqual(a, b){
    if (a === b) return true;
    if (typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b)) return true;
    if (a === null || b === null || typeof a !== "object" || typeof b !== "object") return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    if (a instanceof Set && b instanceof Set) return deepEqual(Array.from(a).sort(), Array.from(b).sort());
    if (a instanceof Map && b instanceof Map) return deepEqual(Array.from(a.entries()), Array.from(b.entries()));
    var aKeys = Object.keys(a), bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every(function(key){ return deepEqual(a[key], b[key]); });
  }
  window.onerror = function(message){
    send({type: "done", logs: logs, error: String(message)});
    return true;
  };
  (async function(){
    try {
${safeCode}
      if (${waitMs} > 0) await new Promise(function(r){ setTimeout(r, ${waitMs}); });
      var specs = ${testsJson};
      var results = [];
      for (var i = 0; i < specs.length; i++) {
        var spec = specs[i];
        var label = spec.label || spec.call || ("Проверка " + (i + 1));
        try {
          if (spec.call) {
            var actual = await eval(spec.call);
            var pass = "expect" in spec ? deepEqual(actual, spec.expect) : actual !== undefined;
            results.push({label: label, pass: pass, expected: "expect" in spec ? fmt(spec.expect, 1) : undefined, actual: fmt(actual, 1)});
          } else if (spec.logsInclude) {
            var joined = logs.map(function(l){ return l.text; }).join("\\n");
            var missing = spec.logsInclude.filter(function(needle){ return joined.indexOf(needle) === -1; });
            results.push({label: label, pass: missing.length === 0, expected: spec.logsInclude.join(", "), actual: missing.length ? "липсва: " + missing.join(", ") : "намерено"});
          }
        } catch (err) {
          results.push({label: label, pass: false, error: (err && err.message) ? err.name + ": " + err.message : String(err)});
        }
      }
      send({type: "done", logs: logs, tests: results});
    } catch (e) {
      send({type: "done", logs: logs, error: (e && e.message) ? e.name + ": " + e.message : String(e)});
    }
  })();
})();
<\/script></body></html>`;
}

export function useCodeSandbox() {
    const [running, setRunning] = useState(false);
    const [result, setResult] = useState<SandboxRunResult | null>(null);
    const [liveLogs, setLiveLogs] = useState<SandboxLog[]>([]);
    const cleanupRef = useRef<(() => void) | null>(null);

    useEffect(() => () => cleanupRef.current?.(), []);

    const run = useCallback((code: string, tests: SandboxTestSpec[] = [], waitMs = 0) => {
        cleanupRef.current?.();
        setRunning(true);
        setResult(null);
        setLiveLogs([]);

        return new Promise<SandboxRunResult>(resolve => {
            const runId = `run_${Date.now()}_${Math.random().toString(36).slice(2)}`;
            const iframe = document.createElement("iframe");
            iframe.setAttribute("sandbox", "allow-scripts");
            iframe.setAttribute("aria-hidden", "true");
            iframe.style.cssText = "position:absolute;width:0;height:0;border:0;visibility:hidden";

            let finished = false;
            const finish = (outcome: SandboxRunResult) => {
                if (finished) return;
                finished = true;
                cleanup();
                setRunning(false);
                setResult(outcome);
                resolve(outcome);
            };

            const onMessage = (event: MessageEvent) => {
                const data = event.data as {__imngSandbox?: string, type?: string, entry?: SandboxLog, logs?: SandboxLog[], tests?: SandboxTestResult[], error?: string};
                if (!data || data.__imngSandbox !== runId) return;
                if (data.type === "log" && data.entry) {
                    setLiveLogs(prev => [...prev, data.entry as SandboxLog]);
                    return;
                }
                if (data.type === "done") {
                    finish({logs: data.logs ?? [], tests: data.tests, error: data.error});
                }
            };

            const timeout = window.setTimeout(() => {
                finish({logs: [], timedOut: true, error: "Кодът не приключи навреме. Най-честата причина е безкраен цикъл."});
            }, RUN_TIMEOUT_MS);

            const cleanup = () => {
                window.clearTimeout(timeout);
                window.removeEventListener("message", onMessage);
                iframe.remove();
                cleanupRef.current = null;
            };
            cleanupRef.current = cleanup;

            window.addEventListener("message", onMessage);
            iframe.srcdoc = buildDocument(runId, code, tests, waitMs);
            document.body.appendChild(iframe);
        });
    }, []);

    return {run, running, result, liveLogs, reset: () => { setResult(null); setLiveLogs([]); }};
}
