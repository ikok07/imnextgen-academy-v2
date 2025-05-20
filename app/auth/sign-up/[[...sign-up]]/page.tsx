import {serverGetLocale} from "@/src/entities/utils/server-get-locale.util";
import Image from "next/image";
import SignUpClientComponent from "@/app/_components/auth/SignUpClientComponent";

export default async function Page() {
    const locale = serverGetLocale();
    return <div className="relative grid min-w-[100vw] min-h-[100vh] place-content-center overflow-hidden">
        <Image alt="background" src="/setup/background.jpg" fill className="opacity-50 -z-10 object-cover" />
        <div className="absolute invisible dark:visible inset-0 bg-black opacity-70"/>
        <SignUpClientComponent locale={locale} />
    </div>
}