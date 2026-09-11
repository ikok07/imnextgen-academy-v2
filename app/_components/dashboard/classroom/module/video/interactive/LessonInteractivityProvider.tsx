"use client"

import {createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";

type LessonStorage = {
    checkpoints: Record<string, boolean>,
    drafts: Record<string, string>
}

type LessonInteractivityContextType = {
    lessonId: string,
    /** Регистрира задача/въпрос като стъпка от урока. Връща функция за отписване. */
    registerCheckpoint: (id: string) => void,
    unregisterCheckpoint: (id: string) => void,
    setCheckpointDone: (id: string, done: boolean) => void,
    isCheckpointDone: (id: string) => boolean,
    saveDraft: (id: string, value: string) => void,
    readDraft: (id: string) => string | undefined,
    totalCheckpoints: number,
    doneCheckpoints: number,
    loaded: boolean
}

const LessonInteractivityContext = createContext<LessonInteractivityContextType | null>(null);

const EMPTY_STORAGE: LessonStorage = {checkpoints: {}, drafts: {}};

function storageKey(lessonId: string) {
    return `imng:lesson:${lessonId}`;
}

function readStorage(lessonId: string): LessonStorage {
    if (typeof window === "undefined") return EMPTY_STORAGE;
    try {
        const raw = window.localStorage.getItem(storageKey(lessonId));
        if (!raw) return EMPTY_STORAGE;
        const parsed = JSON.parse(raw) as Partial<LessonStorage>;
        return {
            checkpoints: parsed.checkpoints ?? {},
            drafts: parsed.drafts ?? {}
        };
    } catch {
        return EMPTY_STORAGE;
    }
}

function writeStorage(lessonId: string, state: LessonStorage) {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.setItem(storageKey(lessonId), JSON.stringify(state));
    } catch {
        // Частен режим / пълно хранилище - прогресът просто не се пази локално.
    }
}

type LessonInteractivityProviderProps = {
    lessonId: string,
    /** Извиква се веднъж, когато всички интерактивни стъпки в урока са минати. */
    onAllCheckpointsDone?: () => void,
    alreadyFinished?: boolean,
    children: ReactNode
}

export default function LessonInteractivityProvider({lessonId, onAllCheckpointsDone, alreadyFinished, children}: LessonInteractivityProviderProps) {
    const [state, setState] = useState<LessonStorage>(EMPTY_STORAGE);
    const [registered, setRegistered] = useState<string[]>([]);
    const [loaded, setLoaded] = useState(false);
    const allDoneFired = useRef(false);

    useEffect(() => {
        setState(readStorage(lessonId));
        setRegistered([]);
        setLoaded(true);
        allDoneFired.current = false;
    }, [lessonId]);

    const registerCheckpoint = useCallback((id: string) => {
        setRegistered(prev => prev.includes(id) ? prev : [...prev, id]);
    }, []);

    const unregisterCheckpoint = useCallback((id: string) => {
        setRegistered(prev => prev.filter(item => item !== id));
    }, []);

    const setCheckpointDone = useCallback((id: string, done: boolean) => {
        setState(prev => {
            const next: LessonStorage = {...prev, checkpoints: {...prev.checkpoints, [id]: done}};
            writeStorage(lessonId, next);
            return next;
        });
    }, [lessonId]);

    const saveDraft = useCallback((id: string, value: string) => {
        setState(prev => {
            const next: LessonStorage = {...prev, drafts: {...prev.drafts, [id]: value}};
            writeStorage(lessonId, next);
            return next;
        });
    }, [lessonId]);

    const doneCheckpoints = useMemo(
        () => registered.filter(id => state.checkpoints[id]).length,
        [registered, state.checkpoints]
    );

    useEffect(() => {
        if (!loaded || allDoneFired.current) return;
        if (registered.length === 0 || doneCheckpoints < registered.length) return;
        allDoneFired.current = true;
        if (!alreadyFinished) onAllCheckpointsDone?.();
    }, [loaded, registered.length, doneCheckpoints, alreadyFinished, onAllCheckpointsDone]);

    const value = useMemo<LessonInteractivityContextType>(() => ({
        lessonId,
        registerCheckpoint,
        unregisterCheckpoint,
        setCheckpointDone,
        isCheckpointDone: (id: string) => !!state.checkpoints[id],
        saveDraft,
        readDraft: (id: string) => state.drafts[id],
        totalCheckpoints: registered.length,
        doneCheckpoints,
        loaded
    }), [lessonId, registerCheckpoint, unregisterCheckpoint, setCheckpointDone, saveDraft, state, registered.length, doneCheckpoints, loaded]);

    return <LessonInteractivityContext.Provider value={value}>
        {children}
    </LessonInteractivityContext.Provider>
}

export function useLessonInteractivity() {
    return useContext(LessonInteractivityContext);
}

/** Регистрира стъпка в урока и дава кратък достъп до състоянието ѝ. */
export function useCheckpoint(id: string | undefined) {
    const lesson = useLessonInteractivity();

    useEffect(() => {
        if (!id || !lesson) return;
        lesson.registerCheckpoint(id);
        return () => lesson.unregisterCheckpoint(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return {
        done: !!id && !!lesson?.isCheckpointDone(id),
        setDone: (done: boolean) => {
            if (id) lesson?.setCheckpointDone(id, done);
        },
        draft: id ? lesson?.readDraft(id) : undefined,
        saveDraft: (value: string) => {
            if (id) lesson?.saveDraft(id, value);
        },
        loaded: !!lesson?.loaded
    };
}
