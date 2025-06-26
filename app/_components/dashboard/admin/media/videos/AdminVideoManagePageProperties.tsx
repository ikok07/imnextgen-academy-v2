"use client"

import {IoListOutline} from "react-icons/io5";
import PrimarySelect from "@/app/_components/ui/inputs/PrimarySelect";
import AdminMediaItemPropertyBox from "@/app/_components/dashboard/admin/media/AdminMediaItemPropertyBox";
import {useManageVideo} from "@/app/_providers/admin/AdminManageVideoProvider";
import {useMemo} from "react";
import { Video } from "@/drizzle/schema/videos";
import AdminMediaItemPropertyBoxSkeleton
    from "@/app/_components/dashboard/admin/media/skeletons/AdminMediaItemPropertyBoxSkeleton";
import {Section} from "@/drizzle/schema/sections";

type AdminVideoManagePagePropertiesProps = {
    sectionId: string,
    sectionsForModule: Section[],
    videosForModule: Video[]
}

export default function AdminVideoManagePageProperties({sectionId, sectionsForModule, videosForModule}: AdminVideoManagePagePropertiesProps) {
    const {video, isLoadingVideo, editMode, orderNumber, setOrderNumber} = useManageVideo();

    const availableOrderNumberOptions = useMemo(() => {
        const currSection = sectionsForModule.find(s => s.id === sectionId)!;
        const currSectionVideos = videosForModule.filter(v => v.section_id === sectionId).sort((a, b) => a.order_number - b.order_number);
        let currSectionOrderNumber = currSection.order_number;

        let nearestSectionVideos = currSectionVideos;

        while (nearestSectionVideos.length === 0 && currSectionOrderNumber > 0) {
            const iteratedSection = sectionsForModule.find(s => s.order_number === --currSectionOrderNumber)!;
            nearestSectionVideos = videosForModule.filter(v => v.section_id === iteratedSection.id).sort((a, b) => a.order_number - b.order_number);
        }

        if (nearestSectionVideos.length === 0) return [0];

        return currSectionVideos.length > 0 ? currSectionVideos.map(v => v.order_number) : [nearestSectionVideos[nearestSectionVideos.length - 1].order_number + 1];
    }, [sectionId, sectionsForModule.length, videosForModule.length]);

    return <div className={`grid ${!editMode ? "grid-cols-2" : "sm:grid-cols-2"} items-center gap-5 mt-4`}>
        {isLoadingVideo ?
            <>
                <AdminMediaItemPropertyBoxSkeleton />
            </>
            :
            <AdminMediaItemPropertyBox
                Icon={IoListOutline}
                label="Поредност"
                value={video?.order_number.toString() ?? "-"}
                valueContent={
                    editMode ? <PrimarySelect
                        className="w-full"
                        placeholder="0"
                        value={orderNumber ?? ""}
                        onValueChange={v => setOrderNumber(v)}
                        options={availableOrderNumberOptions.map(value => ({value: value.toString()}))}
                    /> : undefined
                }
            />
        }
    </div>
}