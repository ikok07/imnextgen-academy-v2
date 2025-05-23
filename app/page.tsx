import Hero from "@/app/_components/home/hero/Hero";
import Tiles from "@/app/_components/home/tiles/Tiles";
import Suitable from "@/app/_components/home/suitable/Suitable";

export default async function Home() {
  return <main className="space-y-10">
    <Hero />
    <Tiles />
    <Suitable />
  </main>
}
