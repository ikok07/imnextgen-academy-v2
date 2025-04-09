import {SignUp} from "@clerk/nextjs";
import {serverGetLocale} from "@/src/entities/utils/serverGetLocale";

export default async function Page() {
    const locale = serverGetLocale();
    return <div className="grid w-[100vw] h-[100vh] place-content-center">
        <SignUp
            unsafeMetadata={{
                locale
            }}
        />
    </div>
}