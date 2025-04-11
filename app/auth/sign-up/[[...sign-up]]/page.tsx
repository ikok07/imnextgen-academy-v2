import {SignUp} from "@clerk/nextjs";
import {serverGetLocale} from "@/src/entities/utils/serverGetLocale";
import Image from "next/image";

export default async function Page() {
    const locale = serverGetLocale();
    return <div className="grid min-w-[100vw] min-h-[100vh] my-3 place-content-center">
        <Image alt="background" src="/setup/background.jpg" fill className="opacity-50 -z-10" />
        <SignUp
            unsafeMetadata={{
                locale
            }}
        />
    </div>
}