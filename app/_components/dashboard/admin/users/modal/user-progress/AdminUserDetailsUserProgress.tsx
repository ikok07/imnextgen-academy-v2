import {FullProfile} from "@/src/entities/models/auth/full-profile";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/app/_components/ui/shadcn/select";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getAllModules, getFinishedVideos, getSectionsForModule, getVideosForSection} from "@/app/dashboard/actions";
import {SetStateAction, useMemo, useState} from "react";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoAlbums} from "react-icons/io5";
import {toast} from "sonner";
import AdminUserDetailsUserProgressSectionRow
    from "@/app/_components/dashboard/admin/users/modal/user-progress/AdminUserDetailsUserProgressSectionRow";
import AdminUserDetailsUserProgressSectionRowSkeleton from "./skeletons/AdminUserDetailsUserProgressSectionRowSkeleton";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/app/_components/ui/shadcn/tooltip";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import AdminUserDetailsUserProgressSections
    from "@/app/_components/dashboard/admin/users/modal/user-progress/AdminUserDetailsUserProgressSections";
import AdminUserDetailsUserProgressVideos
    from "@/app/_components/dashboard/admin/users/modal/user-progress/AdminUserDetailsUserProgressVideos";

type AdminUserDetailsUserProgressProps = {
    fullProfile: FullProfile
}

export default function AdminUserDetailsUserProgress({fullProfile}: AdminUserDetailsUserProgressProps) {

    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

    const {data: allModulesQuery, isLoading: isLoadingAllModules} = useErrorQuery({
        queryFn: () => getAllModules(),
        queryKey: ["allModules"],
        onError() {
            toast.error("Модулите не могат да бъдат заредени!");
        }
    });

    const {data: moduleSectionsQuery, isLoading: isLoadingModuleSections} = useErrorQuery({
        queryFn: () => getSectionsForModule(selectedModuleId),
        queryKey: ["sections", selectedModuleId],
        enabled: !!selectedModuleId,
        onError() {
            toast.error("Секциите за модула не могат да бъдат заредени!");
        }
    });

    const {data: sectionVideosQuery, isLoading: isLoadingSectionVideos} = useErrorQuery({
        queryFn: () => getVideosForSection(selectedSectionId),
        queryKey: ["videos", selectedModuleId, selectedSectionId],
        enabled: !!selectedSectionId,
        onError() {
            toast.error(`Видеата за секцията не могат да бъдат заредени!`);
        }
    });

    const allModules = useMemo(() => {
        if (allModulesQuery?.success) return allModulesQuery.value.sort((a, b) => a.order_number - b.order_number);
        // @ts-ignore
    }, [allModulesQuery?.value]);

    const sectionsForModule = useMemo(() => {
        if (moduleSectionsQuery?.success) return moduleSectionsQuery.value;
        // @ts-ignore
    }, [moduleSectionsQuery?.value]);

    const videosForSection = useMemo(() => {
        if (sectionVideosQuery?.success) return sectionVideosQuery.value;
        // @ts-ignore
    }, [sectionVideosQuery?.value]);

    return <div className="grid grid-cols-[1.5fr_2fr] grid-rows-[auto_1fr] h-[40rem] overflow-hidden gap-4 px-2">
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
                <AdminUserDetailsUserProgressSections
                    selectedModuleId={selectedModuleId}
                    isLoading={isLoadingModuleSections}
                    sections={sectionsForModule}
                    userId={fullProfile.id}
                    selectedSectionId={selectedSectionId}
                    setSelectedSectionId={setSelectedSectionId}
                />
            </div>
        </div>
        <div className="grid grid-rows-[auto_1fr] space-y-2 row-start-2 min-h-0">
            <h4 className="text-lg font-semibold">Видеа</h4>
            <div className="grid auto-rows-max gap-y-2 overflow-auto scrollbar-hide">
                <AdminUserDetailsUserProgressVideos
                    selectedSectionId={selectedSectionId}
                    isLoading={isLoadingSectionVideos}
                    videos={videosForSection}
                    userId={fullProfile.id}
                />
            </div>
        </div>
    </div>
}