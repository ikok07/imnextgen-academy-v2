import {ZodError} from "zod";
import {Dispatch, SetStateAction} from "react";

export type TrackErrorsFunction = (id: string, action: "add" | "remove") => void

type OptionsWithoutValue<T> = {
    type: "default"
    validateCb: () => T,
    trackErrorsFunc?: TrackErrorsFunction,
    errorId?: string,
}

type OptionsIgnoreNull<T> = {
    type: "ignoreNull" | "ignoreNullOrEmpty",
    validateCb: () => T,
    trackErrorsFunc?: TrackErrorsFunction,
    errorId?: string,
    value: T | null
}

type Options<T> = OptionsWithoutValue<T> | OptionsIgnoreNull<T>;

export function handleParse<T>(options: Options<T>) {
    if (options.type === "ignoreNull" && options.value === null) {
        if (options.trackErrorsFunc && options.errorId) {
            options.trackErrorsFunc(options.errorId, "add");
        }
        return undefined
    }

    if (options.type === "ignoreNullOrEmpty" && (options.value === null || options.value === "")) {
        if (options.trackErrorsFunc && options.errorId) {
            options.trackErrorsFunc(options.errorId, "add");
        }
        return undefined
    }

    try {
        options.validateCb();
        if (options.trackErrorsFunc && options.errorId) {
            options.trackErrorsFunc(options.errorId, "remove");
        }
        return undefined;
    } catch(e: unknown) {
        if (options.trackErrorsFunc && options.errorId) {
            options.trackErrorsFunc(options.errorId, "add");
        }
        if (e instanceof ZodError) {
            return (e as ZodError).errors[0].message;
        } else return (e as Error).message;
    }
}

export const trackErrors = (id: string, action: "add" | "remove", validationErrors: string[], setValidationErrors: Dispatch<SetStateAction<string[]>>) => {
    switch (action) {
        case "add":
            if (!validationErrors.includes(id)) setValidationErrors(v => [...v, id]);
            break;
        case "remove":
            if (validationErrors.includes(id)) setValidationErrors(v => v.filter(err => err != id));
            break;
    }
}