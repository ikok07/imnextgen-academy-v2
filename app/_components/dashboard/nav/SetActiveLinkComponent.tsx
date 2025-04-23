"use client"

import { useAppDispatch } from "@/app/_hooks/redux";
import { setActiveLink } from "@/app/_store/slices/dashboardSidebar";
import {ReactNode, useEffect} from "react";

type SetActiveLinkComponentProps = {
    linkId: string,
    children: ReactNode
}

export default function SetActiveLinkComponent({linkId, children}: SetActiveLinkComponentProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setActiveLink(linkId));
    }, []);

    return children
}