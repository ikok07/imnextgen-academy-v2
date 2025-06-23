"use client"

import {useRouter} from "next/navigation";
import {useQueryClient} from "react-query";
import {useMemo, useState} from "react";
import {createColumnHelper, RowSelectionState, SortingState} from "@tanstack/react-table";
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

const columnHelper = createColumnHelper<Video>();

type AdminSectionManageVideosTableProps = {
    moduleId: string,
    sectionId: string,
    allSections: Section[]
    allVideos: Video[]
}

export default function AdminSectionManageVideosTable({moduleId, sectionId, allSections, allVideos}: AdminSectionManageVideosTableProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [createVideoModalOpened, setCreateVideoModalOpened] = useState(false);
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
    const [pagination, setPagination] = useState<PaginationState>({
        pageSize: 10,
        pageIndex: 0
    });
    const [sortedFields, setSortedFields] = useState<SortingState>([]);

    const {data: allVideosQuery, isLoading: isLoadingAllVideos, isRefetching: isRefetchingAllVideos} = useErrorQuery({
        queryFn: () => getVideosForSection(sectionId),
        queryKey: ["allSections", moduleId],
        initialData: {success: true, value: allVideos}
    });

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
        if (!allVideosQuery?.success || isLoadingAllVideos) return [];
        return allVideosQuery.value.sort((a, b) => a.order_number - b.order_number);
        // @ts-ignore
    }, [allVideosQuery?.value, isLoadingAllVideos]);

    return <>
        {<Dialog
            open={createVideoModalOpened}
            onOpenChange={v => {
                setCreateVideoModalOpened(v);
            }}
        >
            <DialogContent className="[&>button:last-child]:hidden w-[95%] max-w-[30rem]">
                <AdminVideoCreateModal moduleId={moduleId} sectionId={sectionId} allSections={allSections} allVideos={data} onClose={() => setCreateVideoModalOpened(false)} />
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
                        onDelete: (rows) => {},
                        otherOptions: [
                            {
                                Icon: IoAddCircle,
                                label: "Създаване",
                                onClick: () => setCreateVideoModalOpened(true),
                                className: "text-cta"
                            }
                        ],
                    }}
                >
                    <AdminSectionManageVideosTableWrapper
                        isDeletingVideos={false}
                        isLoadingAllVideos={isLoadingAllVideos}
                        isRefetchingAlLVideos={isRefetchingAllVideos}
                    />
                </TableProvider>
            </div>
        </div>
    </>
}