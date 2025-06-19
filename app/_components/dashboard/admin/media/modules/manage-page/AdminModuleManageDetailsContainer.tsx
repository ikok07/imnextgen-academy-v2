"use client"

import Image from "next/image";
import AdminModulesManagePageProperties
    from "@/app/_components/dashboard/admin/media/modules/manage-page/AdminModulesManagePageProperties";
import {useAdminManageModule} from "@/app/_providers/AdminManageModuleProvider";
import {Module} from "@/drizzle/schema/modules";

type AdminModuleManageDetailsContainerProps = {
    allModules: Module[]
}

export default function AdminModuleManageDetailsContainer({allModules}: AdminModuleManageDetailsContainerProps) {
    const {module, isLoadingModule} = useAdminManageModule();

    if (!module) return;

    return <div className="grid grid-cols-[1fr_2fr] gap-x-4 mt-4">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            {module.image_url && <Image alt={module.title} src={module.image_url} fill />}
        </div>
        <div>
            <h1 className="text-xl font-extrabold">{module.title}</h1>
            <p className="line-clamp-2 text-primary/70 text-sm mt-1 max-w-[25rem]">{module.description}</p>
            <AdminModulesManagePageProperties module={module} allModules={allModules} />
        </div>
    </div>
}