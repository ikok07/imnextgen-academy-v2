"use client"

import Image from "next/image";
import AdminModulesManagePageProperties
    from "@/app/_components/dashboard/admin/media/modules/manage-page/AdminModulesManagePageProperties";
import {useAdminManageModule} from "@/app/_providers/AdminManageModuleProvider";
import {Module} from "@/drizzle/schema/modules";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/app/_components/ui/shadcn/tooltip";
import {useEffect, useState} from "react";

type AdminModuleManageDetailsContainerProps = {
    allModules: Module[]
}

export default function AdminModuleManageDetailsContainer({allModules}: AdminModuleManageDetailsContainerProps) {
    const {module, isLoadingModule, editMode, newProfileImage, setNewProfileImage} = useAdminManageModule();
    const [imageSizeError, setImageSizeError] = useState(false);

    useEffect(() => {
        if (!editMode) setImageSizeError(false);
    }, [editMode]);

    if (!module) return;

    return <div className="grid grid-cols-[1fr_2fr] gap-x-4 mt-4">
        <div className="flex flex-col items-center">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                {editMode &&
                    <input
                        type="file"
                        id="module-image"
                        className="hidden"
                        onChange={e => {
                            const file = e.target.files ? e.target.files[0] : null;
                            if (!file || !["image/png", "image/jpeg", "image/webp"].includes(file.type)) return;
                            if (file.size > 300_000) {
                                setImageSizeError(true);
                            } else {
                                setNewProfileImage(file)
                                setImageSizeError(false);
                            }
                        }}
                    />
                }
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <label htmlFor="module-image" className={`${editMode ? "cursor-pointer hover:opacity-80" : ""} transition-all duration-200`}>
                                {module.image_url && !newProfileImage && <Image alt={module.title} src={module.image_url} fill className="object-cover" />}
                                {editMode && newProfileImage && <img src={URL.createObjectURL(newProfileImage)} alt={newProfileImage.name} className="w-full h-full object-cover" />}
                            </label>
                        </TooltipTrigger>
                        {editMode && <TooltipContent>
                            <p>Промяна на снимка. Макс 300kb!</p>
                        </TooltipContent>}
                    </Tooltip>
                </TooltipProvider>
            </div>
            {imageSizeError && <p className="text-xs text-red-500" >Снимката не трябва да надвишава 300kb!</p>}
            {editMode && newProfileImage && <button className="text-primary/70 text-sm font-bold mt-3 hover:text-cta transition-all duration-200" onClick={() => setNewProfileImage(null)}>Премахване</button>}
        </div>
        <div>
            <h1 className="text-xl font-extrabold">{module.title}</h1>
            <p className="line-clamp-2 text-primary/70 text-sm mt-1 max-w-[25rem]">{module.description}</p>
            <AdminModulesManagePageProperties module={module} allModules={allModules} />
        </div>
    </div>
}