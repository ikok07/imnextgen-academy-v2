import SectionHeading from "@/app/_components/ui/home/SectionHeading";
import SuitableQualityBox from "@/app/_components/home/suitable/SuitableQualityBox";
import {LucideChartNoAxesCombined, LucideCpu, LucideUserRoundCheck} from "lucide-react";
import Image from "next/image";

export default function Suitable() {
    return <section id="suitable" className="home-center-section grid md:grid-cols-2 gap-5">
        <div>
            <SectionHeading title="Подходящ ли си за нас?" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore" />
            <div className="grid gap-3 mt-5">
                <SuitableQualityBox
                    Icon={LucideCpu}
                    title="Нямаш технически познания"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet"
                />
                <SuitableQualityBox
                    Icon={LucideChartNoAxesCombined}
                    title="Искаш по-добра кариера"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet"
                />
                <SuitableQualityBox
                    Icon={LucideUserRoundCheck}
                    title="Мотивиран и готов"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet"
                />
            </div>
        </div>
        <div className="relative rounded-xl overflow-hidden w-full min-h-[20rem]"><Image alt="Подходящ ли си за нас?" src="/home/suitable/programming.jpeg" fill className="object-cover"/></div>
    </section>
}