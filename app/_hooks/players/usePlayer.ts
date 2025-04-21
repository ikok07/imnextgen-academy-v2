import {useEffect, useState} from "react";

type Options = {
    videoUrl: string
}

export function usePlayer({videoUrl}:  Options) {
    const [isLoading, setIsLoading] = useState(true);
    const [isInvalid, setIsInvalid] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setIsInvalid(false);
    }, [videoUrl]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isLoading) setIsInvalid(true);
        }, 1000 * 30) // 30 seconds
        return () => {
            clearTimeout(timeout);
        }
    }, [isLoading]);

    return {isLoading, setIsLoading, isInvalid}
}