"use client"

import {useMemo, useState} from "react";
import {createColumnHelper, Row, RowSelectionState, SortingState} from "@tanstack/react-table";
import {PaginationState} from "@tanstack/table-core";
import {VideoResource} from "@/drizzle/schema/video_resources";
import {useQueryClient} from "react-query";
import Link from "next/link";
import TableProvider from "@/app/_components/ui/tables/provider/TableProvider";
import {IoAddCircle} from "react-icons/io5";
import AdminVideoManageDetailsResourcesTableWrapper
    from "@/app/_components/dashboard/admin/media/videos/resources-table/AdminVideoManageDetailsResourcesTableWrapper";
import {useManageVideo} from "@/app/_providers/admin/AdminManageVideoProvider";
import {Dialog, DialogContent} from "@/app/_components/ui/shadcn/dialog";
import AdminResourceCreateModal
    from "@/app/_components/dashboard/admin/media/videos/resources-table/AdminResourceCreateModal";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {deleteMultipleResources} from "@/app/dashboard/admin/media/module/[moduleId]/section/[sectionId]/video/[videoId]/actions";
import { toast } from "sonner";

const columnHelper = createColumnHelper<VideoResource>();

export default function AdminVideoManageDetailsResourcesTable() {
    const queryClient = useQueryClient();
    const {module, video, videosForModule} = useManageVideo();
    const [createResourceModalOpened, setCreateResourceModalOpened] = useState(false);
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
    const [pagination, setPagination] = useState<PaginationState>({
        pageSize: 10,
        pageIndex: 0
    });
    const [sortedFields, setSortedFields] = useState<SortingState>([]);

    const {mutate: deleteMultipleResourcesMethod, isLoading: isDeletingResources} = useErrorMutation({
        mutationFn: async ({resourceIds, urls}: {resourceIds: string[], urls: string[]}) => {
            const res = deleteMultipleResources(resourceIds, urls);
            await queryClient.refetchQueries(["videos", module.id]);
            return res;
        },
        onSuccess() {
            toast.success("Избраните ресурси за успешно изтрити!");
        },
        onError() {
            toast.error("Ресурсите не бяха изтрити. Моля, опитай отново!")
        }
    })

    const columns = useMemo(() => [
        columnHelper.accessor(row => row.label, {
            id: "label",
            header: "Име",
            size: 300,
            filterFn: "complexFilter"
        }),
        columnHelper.accessor(row => row.type, {
            id: "type",
            header: "Тип",
            filterFn: "complexFilter",
        }),
        columnHelper.accessor(row => row.url, {
            id: "url",
            header: "Сваляне",
            filterFn: "complexFilter",
            cell: (cell) => <Link href={`${process.env.R2_VIDEO_RESOURCES_BUCKET!}${cell.getValue()}`} target="_blank" className="text-cta hover:opacity-80 duration-200 transition-200">Линк</Link>
        })
    ], []);

    const data: VideoResource[] = useMemo(() => {
        if (!videosForModule || !video) return [];
        return videosForModule
            .flatMap(obj => obj.resources)
            .filter(r => r.video_id === video.id);
    }, [videosForModule]);

    return <>
        {<Dialog
            open={createResourceModalOpened}
            onOpenChange={v => {
                setCreateResourceModalOpened(v);
            }}
        >
            <DialogContent className="[&>button:last-child]:hidden w-[95%] max-h-[95vh] max-w-[30rem] overflow-auto">
                <AdminResourceCreateModal onClose={() => setCreateResourceModalOpened(false)} />
            </DialogContent>
        </Dialog>}
        <h4 className="my-3 text-lg font-semibold">Ресурси</h4>
        <div className="grid w-max mx-auto min-h-[30rem]">
            <TableProvider<VideoResource>
                columns={columns}
                data={data}
                paginationOptions={{
                    enabled: true,
                    pagination,
                    onPaginationChange: setPagination,
                    clientSidePagination: true
                }}
                sortingOptions={{
                    enabled: true,
                    sortedFields,
                    onSortingChange: setSortedFields
                }}
                filterOptions={{
                    enabled: true
                }}
                selectionOptions={{
                    enabled: true,
                    showWhenNoSelection: true,
                    selectedRows,
                    onRowSelected: setSelectedRows,
                    multipleSelection: true,
                    onDelete: (rows: Row<VideoResource>[]) => deleteMultipleResourcesMethod({resourceIds: rows.map(r => (r.original.id)), urls: rows.map(r => (r.original.url))}),
                    otherOptions: [
                        {
                            Icon: IoAddCircle,
                            label: "Създаване",
                            disabled: false,
                            onClick: () => setCreateResourceModalOpened(true),
                            className: "text-cta"
                        }
                    ],
                }}
            >
                <AdminVideoManageDetailsResourcesTableWrapper isDeletingResources={isDeletingResources} />
            </TableProvider>
        </div>
    </>
}