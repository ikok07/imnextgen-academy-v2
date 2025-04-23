import {LucideClapperboard} from "lucide-react";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {Routes} from "@/app/_utils/nav/routes";

export default function DashboardModuleNoVideos() {
    return <div className="grid place-content-center text-center max-w-[35rem] mx-auto">
        <LucideClapperboard className="mx-auto text-cta mb-3" width="4rem" height="4rem"/>
        <h1 className="text-2xl font-extrabold">Очаквай скоро</h1>
        <p className="text-primary/70 mb-5">За съжаление този модул все още се разработва. Очаквай в най-скоро време повече информация</p>
        <PrimaryButton href={Routes.dashboard.classroom.base}>Връщане назад</PrimaryButton>
    </div>
}