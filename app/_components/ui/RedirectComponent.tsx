"use client"

import {useRouter} from "next/navigation";

type RedirectComponentProps = {
    path: string
}

export default function RedirectComponent({path}: RedirectComponentProps) {
    const router = useRouter();
    router.push(path);
    return null;
}