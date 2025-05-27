import Hero from "@/app/_components/home/hero/Hero";
import Tiles from "@/app/_components/home/tiles/Tiles";
import Suitable from "@/app/_components/home/suitable/Suitable";
import Technologies from "@/app/_components/home/technologies/Technologies";
import GraphicDesign from "@/app/_components/home/graphic-design/GraphicDesign";
import Mentoring from "@/app/_components/home/mentoring/Mentoring";
import Team from "@/app/_components/home/team/Team";
import Partners from "@/app/_components/home/partners/Partners";
import Testimonials from "@/app/_components/home/testimonials/Testimonials";
import StartNow from "@/app/_components/home/start-now/StartNow";
import Footer from "@/app/_components/home/footer/Footer";
import HomepageNavbar from "@/app/_components/home/nav/HomepageNavbar";
import {getInjection} from "@/di/container";

// TODO: 1. Add sitemap and robots.txt
// TODO: 2. Add iubenda cookies banner
// TODO: 3. Export old users from old database
// TODO: 4. Add webinars

export default async function Home() {

  console.log(await getInjection("IGenerateBackendKeyController")());

  return <main className="homepage space-y-10">
    <HomepageNavbar />
    <Hero />
    <Tiles />
    <Suitable />
    <Technologies />
    <GraphicDesign />
    <Mentoring />
    <Team />
    <Partners />
    <Testimonials />
    <StartNow />
    <Footer />
  </main>
}
