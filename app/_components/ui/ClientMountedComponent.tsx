"use client"

import {ReactNode, useEffect, useState} from "react";

type ClientMountedComponentProps = {
    children: ReactNode
}

export default function ClientMountedComponent({children}: ClientMountedComponentProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return;

    return children
}