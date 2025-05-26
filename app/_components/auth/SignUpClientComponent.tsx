"use client"

import {SignUp} from "@clerk/nextjs";
import {useTheme} from "next-themes";

type SignUpClientComponentProps = {
    locale: string
}

export default function SignUpClientComponent({locale}: SignUpClientComponentProps) {
    const {resolvedTheme} = useTheme();

    return <SignUp
        appearance={{
            layout: {
                logoImageUrl: resolvedTheme === "dark" ? "/logo-dark.png" : "/logo.png"
            }
        }}
        unsafeMetadata={{
            locale
        }}
    />
}