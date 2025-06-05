"use client"

import TableProvider from "@/app/_components/ui/tables/provider/TableProvider";
import PrimaryTable from "@/app/_components/ui/tables/primary/PrimaryTable";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getAllProfiles} from "@/app/actions";
import {useMemo, useState} from "react";
import {createColumnHelper, RowSelectionState, SortingState} from "@tanstack/react-table";
import {FullProfile} from "@/src/entities/models/auth/full-profile";
import {PaginationState} from "@tanstack/table-core";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";

const columnHelper = createColumnHelper<FullProfile>();

export default function AdminUsersTable() {
    const {data: allProfilesQuery, isLoading: isLoadingAllProfiles} = useErrorQuery({
        queryFn: () => getAllProfiles(),
        queryKey: ["allProfiles"]
    });

    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
    const [pagination, setPagination] = useState<PaginationState>({
        pageSize: 10,
        pageIndex: 0
    });
    const [sortedFields, setSortedFields] = useState<SortingState>([]);

    const columns = useMemo(() => {
        return [
            columnHelper.accessor(row => row.id, {
                id: "user_id",
                header: "ID",
                filterFn: "complexFilter"
            }),
            columnHelper.accessor(row => row.name, {
                id: "name",
                header: "Име",
                size: 300,
                filterFn: "complexFilter"
            }),
            columnHelper.accessor(row => row.email, {
                id: "email",
                header: "Имейл",
                size: 300,
                filterFn: "complexFilter"
            }),
            columnHelper.accessor(row => row.roles.sort().join(", "), {
                id: "roles",
                header: "Роли",
                filterFn: "complexFilter"
            }),
            columnHelper.display({
                id: "open_btn",
                cell: ({row}) => <div className="flex items-center justify-center"><SecondaryButton>Управление</SecondaryButton></div>,
                enableResizing: false
            })
        ];
    }, []);

    const data = useMemo(() => {
        if (!allProfilesQuery || !allProfilesQuery.success || isLoadingAllProfiles) return [];
        return allProfilesQuery.value;
        // @ts-ignore
    }, [(allProfilesQuery?.value)])

    return <TableProvider<FullProfile>
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
            selectedRows,
            onRowSelected: setSelectedRows,
            multipleSelection: true,
            onDelete: (rows) => console.log(rows)
        }}
    >
        <PrimaryTable isLoading={isLoadingAllProfiles} rowSize={50} />
    </TableProvider>
}