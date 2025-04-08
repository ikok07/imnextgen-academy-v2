"use client"

import {ReactNode} from "react";
import {bgBG, enUS} from "@clerk/localizations";
import {dark} from "@clerk/themes";
import {ClerkProvider} from "@clerk/nextjs";
import {useTheme} from "next-themes";

type ClerkAuthProviderProps = {
    locale: string,
    children: ReactNode
}

export default function ClerkAuthProvider({children, locale}: ClerkAuthProviderProps) {

    const {resolvedTheme} = useTheme();

    return <ClerkProvider
        localization={locale === "bg" ? bgBG : enUS}
        appearance={{
            baseTheme: resolvedTheme === "dark" ? dark : undefined,
            variables: {
                colorPrimary: "#825dff"
            },
            layout: {
                logoImageUrl: "/logo.png",
                privacyPageUrl: "/",
            },
            elements: {
                logoImage: "h-[3rem] mb-3"
            }
        }}
    >
        {children}
    </ClerkProvider>
}