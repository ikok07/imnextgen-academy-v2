"use client"

import {useRouter} from "next/navigation";
import {useQueryClient} from "react-query";
import {useMemo, useState} from "react";
import {createColumnHelper, Row, RowSelectionState, SortingState} from "@tanstack/react-table";
import {PaginationState} from "@tanstack/table-core";
import {Video} from "@/drizzle/schema/videos";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {Routes} from "@/app/_utils/nav/routes";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getVideosForSection} from "@/app/dashboard/actions";
import TableProvider from "@/app/_components/ui/tables/provider/TableProvider";
import {IoAddCircle} from "react-icons/io5";
import AdminSectionManageVideosTableWrapper
    from "@/app/_components/dashboard/admin/media/sections/videos-table/AdminSectionManageVideosTableWrapper";
import {Dialog, DialogContent} from "@/app/_components/ui/shadcn/dialog";
import AdminVideoCreateModal from "@/app/_components/dashboard/admin/media/sections/videos-table/AdminVideoCreateModal";
import {Section} from "@/drizzle/schema/sections";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {
    deleteMultipleVideos,
} from "@/app/dashboard/admin/media/module/[moduleId]/section/[sectionId]/action";
import {toast} from "sonner";
import {useManageSection} from "@/app/_providers/admin/AdminManageSectionProvider";

const columnHelper = createColumnHelper<Video>();

type AdminSectionManageVideosTableProps = {
    moduleId: string,
    sectionId: string,
}

export default function AdminSectionManageVideosTable({moduleId, sectionId}: AdminSectionManageVideosTableProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const {allSections, allVideosForModule, isLoadingAllVideosForModule, isRefetchingAllVideosForModule} = useManageSection();
    const [createVideoModalOpened, setCreateVideoModalOpened] = useState(false);
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
    const [pagination, setPagination] = useState<PaginationState>({
        pageSize: 10,
        pageIndex: 0
    });
    const [sortedFields, setSortedFields] = useState<SortingState>([]);

    const allVideos = useMemo(() => {
        return allVideosForModule?.filter(v => v.section_id === sectionId);
    }, [allVideosForModule]);

    const {mutate: deleteMultipleVideosMethod, isLoading: isDeletingVideos} = useErrorMutation({
        mutationFn: async (videoObjs: { id: string, playbackId: string | undefined | null }[]) => {
            const res = await deleteMultipleVideos(moduleId, videoObjs);
            await queryClient.refetchQueries(["sections", moduleId]);
            await queryClient.refetchQueries(["videos", moduleId]);
            setSelectedRows({});
            return res;
        },
        onSuccess() {
            toast.success("Избраните видеа бяха успешно изтрити");
        },
        onError() {
            toast.error("Избраните видеа не можаха да бъдат изтрити!");
        }
    });

    const createVideoDisabled = useMemo(() => {
        if (!allSections || !allVideosForModule) return true;
        return allSections.length > 0 && allVideosForModule.length === 0 && allSections.find(s => s.id === sectionId)!.order_number != 0;
    }, [allVideos]);

    const columns = useMemo(() => [
        columnHelper.accessor(row => row.title, {
            id: "title",
            header: "Заглавие",
            size: 300,
            filterFn: "complexFilter"
        }),
        columnHelper.accessor(row => row.order_number, {
            id: "order_number",
            header: "Поредност",
            size: 300,
            filterFn: "complexFilter"
        }),
        columnHelper.display({
            id: "open_btn",
            cell: ({row}) => {
                return <div className="flex items-center justify-center"><SecondaryButton onClick={() => router.push(Routes.dashboard.admin.video(moduleId, sectionId, row.original.id))}>Управление</SecondaryButton></div>
            },
            enableResizing: false
        })
    ], []);

    const data = useMemo(() => {
        if (!allVideos || isLoadingAllVideosForModule) return [];
        return allVideos.sort((a, b) => a.order_number - b.order_number);
        // @ts-ignore
    }, [allVideos?.length, isLoadingAllVideosForModule, isRefetchingAllVideosForModule]);

    return <>
        {<Dialog
            open={createVideoModalOpened}
            onOpenChange={v => {
                setCreateVideoModalOpened(v);
            }}
        >
            <DialogContent className="[&>button:last-child]:hidden w-[95%] max-h-[95vh] max-w-[30rem] overflow-auto">
                <AdminVideoCreateModal moduleId={moduleId} sectionId={sectionId} onClose={() => setCreateVideoModalOpened(false)} />
            </DialogContent>
        </Dialog>}
        <div className="grid grid-rows-[auto_1fr] mt-4 gap-6">
            <h4 className="text-xl font-bold">Видеа към секцията</h4>
            <div className="grid mx-auto">
                <TableProvider<Video>
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
                        onDelete: (rows: Row<Video>[]) => deleteMultipleVideosMethod(rows.map(r => ({id: r.original.id, playbackId: r.original.playbackId}))),
                        otherOptions: [
                            {
                                Icon: IoAddCircle,
                                label: "Създаване",
                                disabled: createVideoDisabled,
                                tooltipMessage: createVideoDisabled ? "Няма видеа в нито една от предишните секции" : undefined,
                                onClick: () => setCreateVideoModalOpened(true),
                                className: "text-cta"
                            }
                        ],
                    }}
                >
                    <AdminSectionManageVideosTableWrapper
                        isDeletingVideos={isDeletingVideos}
                    />
                </TableProvider>
            </div>
        </div>
    </>
}