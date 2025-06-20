"use client"

import PrimaryTable from "@/app/_components/ui/tables/primary/PrimaryTable";
import {IoAddCircle} from "react-icons/io5";
import TableProvider from "@/app/_components/ui/tables/provider/TableProvider";
import {createColumnHelper, RowSelectionState, SortingState} from "@tanstack/react-table";
import {Section} from "@/drizzle/schema/sections";
import {useMemo, useState} from "react";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {Routes} from "@/app/_utils/nav/routes";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getSectionsForModule} from "@/app/dashboard/actions";
import {PaginationState} from "@tanstack/table-core";
import AdminModuleManageSectionsTableWrapper
    from "@/app/_components/dashboard/admin/media/modules/manage-page/sections-table/AdminModuleManageSectionsTableWrapper";
import {useRouter} from "next/navigation";
import {Dialog, DialogContent} from "@/app/_components/ui/shadcn/dialog";
import AdminSectionCreateModal
    from "@/app/_components/dashboard/admin/media/modules/manage-page/sections-table/AdminSectionCreateModal";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {deleteMultipleSections} from "@/app/dashboard/admin/media/module/[id]/actions";
import {toast} from "sonner";
import {useQueryClient} from "react-query";

const columnHelper = createColumnHelper<Section>();

type AdminModuleManageSectionsTableProps = {
    moduleId: string,
    allSections: Section[]
}

export default function AdminModuleManageSectionsTable({moduleId, allSections}: AdminModuleManageSectionsTableProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [createSectionModalOpened, setCreateSectionModalOpened] = useState(false);
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
    const [pagination, setPagination] = useState<PaginationState>({
        pageSize: 10,
        pageIndex: 0
    });
    const [sortedFields, setSortedFields] = useState<SortingState>([]);

    const {data: allSectionsQuery, isLoading: isLoadingAllSections, isRefetching: isRefetchingAllSections} = useErrorQuery({
        queryFn: () => getSectionsForModule(moduleId),
        queryKey: ["allSections", moduleId],
        initialData: {success: true, value: allSections}
    });

    const {mutate: deleteSectionsMethod, isLoading: isDeletingSections} = useErrorMutation({
        mutationFn: async (sectionIds: string[]) => {
            const res = await deleteMultipleSections(moduleId, sectionIds);
            await queryClient.refetchQueries(["allSections", moduleId]);
            return res;
        },
        onSuccess() {
            toast.success("Избраните секции са изтрити успешно!");
        },
        onError() {
            toast.error("Секциите не можаха да бъдат изтрити!");
        }
    })

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
                return <div className="flex items-center justify-center"><SecondaryButton onClick={() => router.push(Routes.dashboard.admin.media())}>Управление</SecondaryButton></div>
            },
            enableResizing: false
        })
    ], []);

    const data = useMemo(() => {
        if (!allSectionsQuery?.success || isLoadingAllSections) return [];
        return allSectionsQuery.value.sort((a, b) => a.order_number - b.order_number);
        // @ts-ignore
    }, [allSectionsQuery?.value, isLoadingAllSections]);

    return <>
        {<Dialog
            open={createSectionModalOpened}
            onOpenChange={v => {
                setCreateSectionModalOpened(v);
            }}
        >
            <DialogContent className="[&>button:last-child]:hidden w-[95%] max-w-[30rem]">
                <AdminSectionCreateModal moduleId={moduleId} onClose={() => setCreateSectionModalOpened(false)} />
            </DialogContent>
        </Dialog>}
        <div className="grid grid-rows-[auto_1fr] mt-4 gap-6">
            <h4 className="text-xl font-bold">Секции към модула</h4>
            <div className="grid mx-auto">
                <TableProvider<Section>
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
                        onDelete: (rows) => deleteSectionsMethod(rows.map(r => r.original.id)),
                        otherOptions: [
                            {
                                Icon: IoAddCircle,
                                label: "Създаване",
                                onClick: () => setCreateSectionModalOpened(true),
                                className: "text-cta"
                            }
                        ],
                    }}
                >
                    <AdminModuleManageSectionsTableWrapper
                        isDeletingSections={isDeletingSections}
                        isLoadingAllSections={isLoadingAllSections}
                        isRefetchingAllSections={isRefetchingAllSections}
                    />
                </TableProvider>
            </div>
        </div>
    </>
}