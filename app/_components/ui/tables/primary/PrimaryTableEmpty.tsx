import {LucideGrid2x2Plus} from "lucide-react";

export default function PrimaryTableEmpty() {
    return <div className="flex flex-col items-center text-center px-3 pt-10">
        <LucideGrid2x2Plus className="text-cta w-[2rem] h-[2rem]" />
        <h3 className="font-bold text-lg">Таблицата е празна</h3>
        <p className="text-primary/70 text-sm">Не са налични данни, с които да се попълни таблицата</p>
    </div>
}