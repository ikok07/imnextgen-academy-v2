import {getRequestConfig} from "next-intl/server";
import {cookies} from "next/headers";
import {SUPPORTED_LANGS, SupportedLanguage} from "@/app/_config/config";
import {Localizator} from "@/i18n/localizator";

export default getRequestConfig(async () => {
    const userCookies = cookies();
    const lang = userCookies.get("NEXT_INTL");
    let locale = "bg";

    if (lang && SUPPORTED_LANGS.includes(lang.value as SupportedLanguage)) locale = lang.value;

    Localizator.getInstance().loadMessages((await import(`../messages/${locale}.json`)).default);
    Localizator.getInstance().loadMessages((await import(`@/modules/test/messages/${locale}.json`)).default);

    return {
        locale,
        messages: Localizator.getInstance().getMessages()
    }
})