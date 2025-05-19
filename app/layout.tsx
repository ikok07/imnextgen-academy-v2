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

export const metadata: Metadata = {
  title: "Basic Academy",
  description: "Created by Kaloyan Stefanov (CTO of I&M NextGen)",
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

type LayoutProps = {
    children: ReactNode
}

export default async function RootLayout({
  children,
}: Readonly<LayoutProps>) {
    const locale = await getLocale()
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning={true}>
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
        </html>
    );
}
