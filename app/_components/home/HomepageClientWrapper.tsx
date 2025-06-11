"use client"

import {ReactNode, useEffect} from "react";

type HomepageClientWrapperProps = {
    children: ReactNode
}

export default function HomepageClientWrapper({children}: HomepageClientWrapperProps) {
    useEffect(() => {
        import("react-facebook-pixel")
            .then(x => x.default)
            .then((ReactPixel) => {
                ReactPixel.init(process.env.NEXT_PUBLIC_FB_PIXEL_ID!);
                ReactPixel.pageView();
            });
    }, []);

    return <>
        {children}
    </>
}