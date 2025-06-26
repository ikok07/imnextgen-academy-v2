import {FullProfile} from "@/src/entities/models/auth/full-profile";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/app/_components/ui/shadcn/select";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/app/_components/ui/shadcn/tooltip";

import AdminUserDetailsUserProgressSections
    from "@/app/_components/dashboard/admin/users/modal/user-progress/AdminUserDetailsUserProgressSections";
import AdminUserDetailsUserProgressVideos
    from "@/app/_components/dashboard/admin/users/modal/user-progress/AdminUserDetailsUserProgressVideos";
import {useUserProgress} from "@/app/_providers/admin/UserProgressProvider";

type AdminUserDetailsUserProgressProps = {
    fullProfile: FullProfile
}

export default function AdminUserDetailsUserProgress({fullProfile}: AdminUserDetailsUserProgressProps) {
    const {selectedModuleId, setSelectedModuleId, allModules, isLoadingAllModules} = useUserProgress();

    return <div className="grid lg:grid-rows-[auto_1fr] lg:grid-cols-[1.5fr_2fr] h-[40rem] overflow-hidden gap-4 px-2">
        <div className="space-y-2">
            <h4 className="text-lg font-semibold">Избиране на модул</h4>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger className="w-full">
                        <Select value={selectedModuleId ?? ""} onValueChange={v => setSelectedModuleId(v)}
                                disabled={isLoadingAllModules}>
                            <SelectTrigger>
                                <SelectValue placeholder="Модул"/>
                            </SelectTrigger>
                            <SelectContent>
                                {allModules?.map((module, index) => {
                                    return <SelectItem value={module.id} key={index}>{module.title}</SelectItem>
                                })}
                            </SelectContent>
                        </Select>
                    </TooltipTrigger>
                    {isLoadingAllModules && <TooltipContent>
                        <p>Данните се зареждат</p>
                    </TooltipContent>}
                </Tooltip>
            </TooltipProvider>
        </div>
        <div className="grid grid-rows-[auto_1fr] space-y-2 row-start-2 min-h-0">
            <h4 className="text-lg font-semibold">Секции</h4>
            <div className="grid auto-rows-max gap-y-2 overflow-auto scrollbar-hide">
                <AdminUserDetailsUserProgressSections />
            </div>
        </div>
        <div className="grid grid-rows-[auto_1fr] space-y-2 row-start-3 lg:row-start-2 min-h-0">
            <h4 className="text-lg font-semibold">Видеа</h4>
            <div className="grid auto-rows-max gap-y-2 overflow-auto scrollbar-hide">
                <AdminUserDetailsUserProgressVideos
                    userId={fullProfile.id}
                />
            </div>
        </div>
    </div>
}