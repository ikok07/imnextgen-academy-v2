import {Module} from "@/drizzle/schema/modules";
import Image from "next/image";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";

type ModuleBoxProps = {
    module: Module | undefined
}

export default function ModuleBox({module}: ModuleBoxProps) {

    if (!module) return;

    const modulePercentage = module.order_number % 2 === 0;

    return <div className="rounded-lg shadow-xl border border-border w-[95%] md:w-full">
        {module.image_url && <div className="relative w-full aspect-video"><Image alt={module.title} src={module.image_url} fill className="rounded-t-lg"/></div>}
        <div className="px-2 py-3">
            <div className="h-[7.5rem] overflow-auto">
                <h2 className="text-lg font-bold mb-1">{module.title}</h2>
                <p className="text-[0.8rem] text-primary/50">{module.description}</p>
            </div>
            {!!modulePercentage ? <PrimaryButton className="mt-6 w-full">Продължаване (12%)</PrimaryButton> : <SecondaryButton className="mt-6 w-full">Стартиране</SecondaryButton>}
        </div>
    </div>
}