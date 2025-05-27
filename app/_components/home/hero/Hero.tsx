import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import Link from "next/link";

export default function Hero() {
    return <section id="hero" className="home-center-section text-center pt-10">
        <h1 className="text-4xl md:text-5xl font-extrabold"><span className="text-cta">Преобрази</span> бъдещето си с кариера в IT</h1>
        <p className="paragraph mt-3 max-w-[40rem] mx-auto">Обучение, създадено за начинаещи. Научи се да програмираш и да създаваш уеб сайтове от нулата. Изгради портфолио и стани част от най-бързо развиващия се сектор в света.</p>
        <div className="flex justify-center items-center gap-3 mt-5">
            <PrimaryButton className="py-2 px-3">Започни безплатно</PrimaryButton>
            <Link href="/#tiles" className="hover:opacity-70 transition-all duration-200">Научи повече ↓</Link>
        </div>
    </section>
}