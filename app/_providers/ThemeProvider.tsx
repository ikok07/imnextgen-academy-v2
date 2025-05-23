"use client"

import {ThemeProvider as NextThemeProvider} from "next-themes"
import {ComponentProps, useMemo} from "react";
import {usePathname} from "next/navigation";
import {FORCED_LIGHT_THEME_PAGES} from "@/app/_utils/theme/forced-light-theme-pages";

type ThemeProviderProps = {} & ComponentProps<typeof NextThemeProvider>

export default function ThemeProvider({children, forcedTheme, ...props}: ThemeProviderProps) {
    const pathname = usePathname();
    const customForcedTheme = useMemo(() => FORCED_LIGHT_THEME_PAGES.includes(pathname) ? "light" : null, []);

    return <NextThemeProvider
        {...props}
        forcedTheme={forcedTheme ?? customForcedTheme ?? undefined}
    >
        {children}
    </NextThemeProvider>
}