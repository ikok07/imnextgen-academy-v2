"use client"

import {useEffect, useState} from "react";

type UseViewLoadedProps = {
    onLoaded?: () => void
}

export function useViewLoaded(props?: UseViewLoadedProps) {
    const [viewLoaded, setViewLoaded] = useState(false);

    useEffect(() => {
        setViewLoaded(true);
        if (props?.onLoaded) props.onLoaded();
    }, []);

    return {viewLoaded};
}