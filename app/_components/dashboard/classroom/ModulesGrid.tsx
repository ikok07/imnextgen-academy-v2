import {getAllModules} from "@/app/dashboard/actions";
import ModuleBox from "@/app/_components/dashboard/classroom/ModuleBox";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoCloudOffline} from "react-icons/io5";

export default async function ModulesGrid() {
    try {
        const res = await getAllModules();

        return res.success && res.value.map((module, index) => {
            return <ModuleBox key={index} module={module} />
        })
    } catch(e) {
        console.error(e);
        return <PrimaryErrorMessage
            Icon={IoCloudOffline}
            title="Възникна грешка"
            message="Модулите не бяха заредени. Моля, опитай отново!"
            className="col-span-full max-w-[20rem] mx-auto"
        />
    }
}