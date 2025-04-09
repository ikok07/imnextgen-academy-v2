import {cookies} from "next/headers";

export function serverGetLocale() {
    const cookiesData = cookies();
    return cookiesData.get("NEXT_INTL")?.value ?? "en";
}