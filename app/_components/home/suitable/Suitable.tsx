import SectionHeading from "@/app/_components/ui/home/SectionHeading";
import SuitableQualityBox from "@/app/_components/home/suitable/SuitableQualityBox";
import {LucideChartNoAxesCombined, LucideCpu, LucideUserRoundCheck} from "lucide-react";
import Image from "next/image";

export default function Suitable() {
    return <section id="suitable" className="home-center-section grid md:grid-cols-2 gap-5">
        <div>
            <SectionHeading title="Подходящ ли си за нас?" description="Всеки може да се възползва от предимствата на академията стига да изпълянва следните условия:" />
            <div className="grid gap-3 mt-5">
                <SuitableQualityBox
                    Icon={LucideCpu}
                    title="Нямаш технически познания"
                    description="Не се тревожи — започваме от нулата и те водим стъпка по стъпка. Подходящо е дори за хора без предишен опит."
                />
                <SuitableQualityBox
                    Icon={LucideChartNoAxesCombined}
                    title="Искаш по-добра кариера"
                    description="Ако търсиш стабилна, добре платена и перспективна работа, академията ще ти даде нужните умения и насоки."
                />
                <SuitableQualityBox
                    Icon={LucideUserRoundCheck}
                    title="Мотивиран и готов"
                    description="Имаш желанието да учиш и да се развиваш? Това е най-важното — останалото ще го научиш с нас."
                />
            </div>
        </div>
        <div className="relative rounded-xl overflow-hidden w-full min-h-[20rem]"><Image alt="Подходящ ли си за нас?" src="/home/suitable/programming.jpeg" fill className="object-cover"/></div>
    </section>
}