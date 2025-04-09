"use client"

import Cookies from "js-cookie"
import {SUPPORTED_LANGS, SupportedLanguage} from "@/app/_config/config";
import {useRouter} from "next/navigation";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/app/_components/ui/shadcn/dropdown-menu";
import {LuGlobe} from "react-icons/lu";
import {useTranslations} from "use-intl";
import ClientMountedComponent from "@/app/_components/ui/ClientMountedComponent";
import {useUser} from "@clerk/nextjs";

export default function LanguageSelector() {
    const router = useRouter();
    const t = useTranslations("Config.Languages");
    const {user} = useUser();

    function handleSelectLanguage(lang: SupportedLanguage) {
        const prevLang = Cookies.get("NEXT_INTL") ?? "en";
        Cookies.set("NEXT_INTL", lang);
        if (user) {
            user.update({
                unsafeMetadata: {
                    locale: lang
                }
            }).catch(() => {
                Cookies.set("NEXT_INTL", prevLang);
                router.refresh();
            })
        }
        router.refresh();
    }

    return <ClientMountedComponent>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <SecondaryButton><LuGlobe /></SecondaryButton>
                <DropdownMenuContent>
                    {SUPPORTED_LANGS.map((lang, index) => {
                        return <DropdownMenuItem key={index} onClick={() => handleSelectLanguage(lang)}>
                            {t(lang)}
                        </DropdownMenuItem>
                    })}
                </DropdownMenuContent>
            </DropdownMenuTrigger>
        </DropdownMenu>
    </ClientMountedComponent>
}