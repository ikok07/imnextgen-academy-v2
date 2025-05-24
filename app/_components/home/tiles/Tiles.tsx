import TileBox from "@/app/_components/home/tiles/TileBox";

export default function Tiles() {
    return <section id="tiles" className="home-center-section grid md:grid-cols-2 md:grid-rows-2 gap-4 min-h-[40rem]">
        <TileBox
            image="/home/tiles/web-dev.jpg"
            title="Модерни технологии"
            description="Съобразено спрямо реалните изисквания на индустрията обучение. Усвояваш умения, които директно прилагаш в проекти и интервюта."
            className="row-span-2"
        />
        <TileBox
            image="/home/tiles/office.jpg"
            title="Готов си за работа"
            description="Създаваме мост между теб и компаниите – чрез практически задачи, индивидуално портфолио и подготовка за интервюта. "
        />
        <TileBox
            image="/home/tiles/projects.jpg"
            title="Работа с реални проекти"
            description="Работиш по задачи, които изглеждат и функционират като истински. Натрупваш опит, който можеш да покажеш пред работодатели."
        />
    </section>
}