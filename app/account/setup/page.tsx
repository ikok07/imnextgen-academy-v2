import {getInjection} from "@/di/container";
import SetupForm from "@/app/_components/account/setup/SetupForm";
import Image from "next/image";
import {redirect} from "next/navigation";
import {Routes} from "@/app/_utils/nav/routes";
import {getUser} from "@/app/actions";

export default async function Page() {
    const userResponse = await getUser({dbUserNullOnError: true});
    if (!userResponse.success) throw new Error("User could not be fetched!");

    if (userResponse.value?.dbProfile && userResponse.value.dbProfile.configured) redirect(Routes.dashboard.classroom.base);

    const getSetupQuestionsController = getInjection("IGetSetupQuestionController");
    const setupQuestions = await getSetupQuestionsController();

    return <div className="min-w-[100vw] min-h-[100vh] grid place-content-center">
        <Image alt="background" src="/setup/background.jpg" fill className="opacity-50 object-cover -z-10"/>
        <div className="absolute invisible dark:visible inset-0 bg-black opacity-70 -z-10"/>
        <div className="grid max-w-[25rem] bg-background shadow-xl p-5 border border-border rounded-lg">
            <h1 className="text-2xl font-extrabold text-primary text-center mb-1">Почти си готов!</h1>
            <p className="text-center text-sm text-primary/70 mb-3">Моля, отговори на следните въпроси, за да ти предоставим най-доброто преживяване</p>
            <SetupForm setupQuestions={setupQuestions} />
        </div>
    </div>
}