import type { Metadata } from "next";
import "./globals.css";
import {ReactNode} from "react";
import {getLocale, getMessages} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";
import AppStoreProvider from "@/app/_providers/AppStoreProvider";
import AppQueryClientProvider from "@/app/_providers/AppQueryClientProvider";
import ThemeProvider from "@/app/_providers/ThemeProvider";
import ClerkAuthProvider from "@/app/_providers/ClerkAuthProvider";
import { Toaster } from "@/app/_components/ui/shadcn/sonner";
import {Inter} from "next/font/google"
import {IubendaCookieSolutionBannerConfigInterface, IubendaProvider} from "@mep-agency/next-iubenda";

export const metadata: Metadata = {
    title: "I&M NextGen Academy — Без повече притеснения за работа",
    description: "Научи Как да Станеш IT Специалист с Умения като за 5+ Години Опит с I&M NextGen Academy (стъпка по стъпка), БЕЗ Предишен Опит и БЕЗ Скъпи Курсове!",
    openGraph: {
        title: `I&M NextGen Academy — Без повече притеснения за работа`,
        description: "Научи Как да Станеш IT Специалист с Умения като за 5+ Години Опит с I&M NextGen Academy (стъпка по стъпка), БЕЗ Предишен Опит и БЕЗ Скъпи Курсове!",
        url: process.env.NEXT_PUBLIC_BASE_URL,
        siteName: "I&M NextGen Academy",
        images: ["/banner.jpg"],
        locale: "bg_BG",
        type: "website"
    },
    icons: {
      icon: [
          {
              media: "(prefers-color-scheme: light)",
              url: "/favicon.svg",
              href: "/favicon.svg"
          },
          {
              media: "(prefers-color-scheme: dark)",
              url: "/favicon-dark.svg",
              href: "/favicon-dark.svg"
          }
      ]
    }
};

const InterFont = Inter({
    subsets: ["cyrillic"]
});

const bannerConfig: IubendaCookieSolutionBannerConfigInterface = {
    siteId: 3839657,
    cookiePolicyId: 82266683,
    lang: "bg",
    whitelabel: true,
    floatingPreferencesButtonDisplay: false
}

type LayoutProps = {
    children: ReactNode
}

export default async function RootLayout({
  children,
}: Readonly<LayoutProps>) {
    const locale = await getLocale()
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning={true} className={InterFont.className}>
            <IubendaProvider bannerConfig={bannerConfig}>
                <NextIntlClientProvider messages={messages}>
                    <AppStoreProvider>
                        <AppQueryClientProvider>
                            <body>
                            <ThemeProvider
                                attribute="class"
                                defaultTheme="system"
                                enableSystem={true}
                                disableTransitionOnChange={true}
                            >
                                <ClerkAuthProvider locale={locale}>
                                    {children}
                                    <Toaster
                                        position="top-right"
                                    />
                                </ClerkAuthProvider>
                            </ThemeProvider>
                            </body>
                        </AppQueryClientProvider>
                    </AppStoreProvider>
                </NextIntlClientProvider>
            </IubendaProvider>
        </html>
    );
}
