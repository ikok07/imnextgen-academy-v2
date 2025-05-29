import SectionHeading from "@/app/_components/ui/home/SectionHeading";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {Routes} from "@/app/_utils/nav/routes";
import {getUser} from "@/app/_utils/actions/auth";

export default async function StartNow() {
    const res = await getUser();
    const loggedIn = res.success && res.value.user?.id;

    return <section id="start-now" className="home-center-section flex flex-col items-center py-20">
        <SectionHeading
            title="Кандидатствай сега и започни промяната"
            description="Необходимо е само да създадеш своя профил в академията"
            className="text-center"
        />
        <PrimaryButton
            href={loggedIn ? Routes.dashboard.base : Routes.auth.signUp()}
            className="mt-5 py-2 px-3"
        >
            {loggedIn ? "Главен панел" : "Започни безплатно"}
        </PrimaryButton>
    </section>
}