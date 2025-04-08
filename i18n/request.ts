import {getRequestConfig} from "next-intl/server";
import {cookies} from "next/headers";
import {SUPPORTED_LANGS, SupportedLanguage} from "@/app/_config/config";

export default getRequestConfig(async () => {
    const userCookies = cookies();
    const lang = userCookies.get("NEXT_INTL");
    let locale = "en";

    if (lang && SUPPORTED_LANGS.includes(lang.value as SupportedLanguage)) locale = lang.value

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    }
})