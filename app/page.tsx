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
import HomepageClientWrapper from "@/app/_components/home/HomepageClientWrapper";

// TODO: 1. Implement admin progress tracking
// TODO: 1.1 Extract states in a context provider
// TODO: 1.2 Track video progress every 25% of the video.
// TODO: 2. Update figma database models

export default async function Home() {
  return <HomepageClientWrapper>
    <main className="homepage space-y-10">
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
  </HomepageClientWrapper>
}
