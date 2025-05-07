import TestComponent from "@/modules/test/app/_components/TestComponent";
import {testMethod} from "@/modules/test/app/action";
import {getTranslations} from "next-intl/server";

export default async function Page() {
    console.log(await testMethod());
    const t = await getTranslations("Common");

    return <div>
        THIS IS A TEST MODULE PAGE
        <TestComponent />
        Language test: {t("test")}
    </div>
}