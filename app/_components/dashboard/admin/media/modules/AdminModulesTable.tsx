"use client"

import {useQueryClient} from "react-query";
import {useMemo, useState} from "react";
import {createColumnHelper, RowSelectionState, SortingState} from "@tanstack/react-table";
import {PaginationState} from "@tanstack/table-core";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {Module} from "@/drizzle/schema/modules";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getAllModules} from "@/app/dashboard/actions";
import {toast} from "sonner";
import TableProvider from "@/app/_components/ui/tables/provider/TableProvider";
import AdminModulesTableWrapper from "@/app/_components/dashboard/admin/media/modules/AdminModulesTableWrapper";
import {useRouter} from "next/navigation";
import {Routes} from "@/app/_utils/nav/routes";
import {IoAddCircle} from "react-icons/io5";
import {Dialog, DialogContent} from "@/app/_components/ui/shadcn/dialog";
import AdminModulesTableCreateModuleModal
    from "@/app/_components/dashboard/admin/media/modules/AdminModulesTableCreateModuleModal";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {deleteModules} from "@/app/dashboard/admin/media/actions";

const columnHelper = createColumnHelper<Module>();

export default function AdminModulesTable() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const [createModuleModalOpened, setCreateModuleModalOpened] = useState(false);
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
    const [pagination, setPagination] = useState<PaginationState>({
        pageSize: 10,
        pageIndex: 0
    });
    const [sortedFields, setSortedFields] = useState<SortingState>([]);

    const {data: allModulesQuery, isLoading: isLoadingAllModules, isRefetching: isRefetchingAllModules} = useErrorQuery({
        queryFn: () => getAllModules(),
        queryKey: ["allModules"],
        onError() {
            toast.error("Модулите не можаха да бъдат заредени");
        }
    });

    const {mutate: deleteModulesMethod, isLoading: isDeletingModules} = useErrorMutation({
        mutationFn: (moduleIds: string[]) => deleteModules(moduleIds),
        onSuccess() {
            queryClient.refetchQueries(["allModules"]);
            toast.success("Избраните модули са изтрити успешно!");
        },
        onError() {
            toast.error("Модулите не можаха да бъдат изтрити!");
        }
    })

    const data = useMemo(() => {
        if (!allModulesQuery?.success || isLoadingAllModules) return [];

        return allModulesQuery.value.sort((a, b) => a.order_number - b.order_number);
        // @ts-ignore
    }, [allModulesQuery?.value, isLoadingAllModules, isRefetchingAllModules]);

    const columns = useMemo(() => {
        return [
            columnHelper.accessor(row => row.title, {
                id: "title",
                header: "Заглавие",
                size: 300,
                filterFn: "complexFilter"
            }),
            columnHelper.accessor(row => row.access, {
                id: "access",
                header: "Достъп",
                filterFn: "complexFilter"
            }),
            columnHelper.accessor(row => row.order_number, {
                id: "orderNumber",
                header: "Поредност",
                filterFn: "complexFilter"
            }),
            columnHelper.display({
                id: "open_btn",
                cell: ({row}) => {
                    return <div className="flex items-center justify-center"><SecondaryButton onClick={() => router.push(Routes.dashboard.admin.module(row.original.id))}>Управление</SecondaryButton></div>
                },
                enableResizing: false
            })
        ];
    }, []);

    return <>
        {<Dialog
            open={createModuleModalOpened}
            onOpenChange={v => {
                setCreateModuleModalOpened(v);
            }}
        >
            <DialogContent className="[&>button:last-child]:hidden w-[95%] max-w-[30rem]">
                <AdminModulesTableCreateModuleModal onClose={() => setCreateModuleModalOpened(false)} />
            </DialogContent>
        </Dialog>}

        <TableProvider<Module>
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
                onDelete: (rows) => deleteModulesMethod(rows.map(r => r.original.id)),
                otherOptions: [
                    {
                        Icon: IoAddCircle,
                        label: "Създаване",
                        onClick: () => setCreateModuleModalOpened(true),
                        className: "text-cta"
                    }
                ],
            }}
        >
            <AdminModulesTableWrapper isDeletingModules={isDeletingModules} isLoadingAllModules={isLoadingAllModules} isRefetchingAllModules={isRefetchingAllModules} />
        </TableProvider>
    </>
}