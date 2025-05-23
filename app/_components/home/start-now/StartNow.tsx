import SectionHeading from "@/app/_components/ui/home/SectionHeading";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {Routes} from "@/app/_utils/nav/routes";

export default function StartNow() {
    return <section id="start-now" className="home-center-section flex flex-col items-center py-20">
        <SectionHeading
            title="Кандидатствай сега и започни промяната"
            description="Необходимо е само да създадеш своя профил в академията"
            className="text-center"
        />
        <PrimaryButton href={Routes.auth.signUp} className="mt-5 py-2 px-3">Започни безплатно</PrimaryButton>
    </section>
}