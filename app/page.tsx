import Hero from "@/app/_components/home/hero/Hero";
import Tiles from "@/app/_components/home/tiles/Tiles";
import Suitable from "@/app/_components/home/suitable/Suitable";
import Technologies from "@/app/_components/home/technologies/Technologies";
import GraphicDesign from "@/app/_components/home/graphic-design/GraphicDesign";
import Mentoring from "@/app/_components/home/mentoring/Mentoring";
import Team from "@/app/_components/home/team/Team";
import Partners from "@/app/_components/home/partners/Partners";
import Testimonials from "@/app/_components/home/testimonials/Testimonials";

export default async function Home() {
  return <main className="homepage space-y-10">
    <Hero />
    <Tiles />
    <Suitable />
    <Technologies />
    <GraphicDesign />
    <Mentoring />
    <Team />
    <Partners />
    <Testimonials />
  </main>
}
