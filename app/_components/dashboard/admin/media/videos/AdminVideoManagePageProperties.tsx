"use client"

import {IoListOutline} from "react-icons/io5";
import PrimarySelect from "@/app/_components/ui/inputs/PrimarySelect";
import AdminMediaItemPropertyBox from "@/app/_components/dashboard/admin/media/AdminMediaItemPropertyBox";
import {useManageVideo} from "@/app/_providers/admin/AdminManageVideoProvider";
import {useMemo} from "react";
import { Video } from "@/drizzle/schema/videos";

type AdminVideoManagePagePropertiesProps = {
    allVideos: Video[]
}

export default function AdminVideoManagePageProperties({allVideos}: AdminVideoManagePagePropertiesProps) {
    const {video, editMode, orderNumber, setOrderNumber} = useManageVideo();

    const availableOrderNumberOptions = useMemo(() => {
        return Array.from({length: allVideos.length}).map((_, index) => index);
    }, [allVideos.length]);

    return <div className={`grid ${!editMode ? "grid-cols-2" : "sm:grid-cols-2"} items-center gap-5 mt-4`}>
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
    </div>
}