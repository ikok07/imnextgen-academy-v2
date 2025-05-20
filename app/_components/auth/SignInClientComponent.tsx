"use client"

import {useTheme} from "next-themes";
import {SignIn} from "@clerk/nextjs";

export default function SignInClientComponent() {
    const {resolvedTheme} = useTheme();

    return <SignIn
        appearance={{
            layout: {
                logoImageUrl: resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo.svg"
            }
        }}
    />
}