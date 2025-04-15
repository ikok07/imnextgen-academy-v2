import {useEffect, useState} from "react";

export function useViewLoaded() {
    const [viewLoaded, setViewLoaded] = useState(false);

    useEffect(() => {
        setViewLoaded(true);
    }, []);

    return {viewLoaded};
}