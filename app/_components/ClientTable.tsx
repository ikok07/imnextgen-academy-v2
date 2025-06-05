"use client"

import TableProvider from "@/app/_components/ui/tables/provider/TableProvider";
import {createColumnHelper, RowSelectionState, SortingState} from "@tanstack/react-table";
import {useEffect, useRef, useState} from "react";
import {PaginationState} from "@tanstack/table-core";
import PrimaryTable from "./ui/tables/primary/PrimaryTable";
import {SetupQuestion} from "@/drizzle/schema/setup_questions";

const columnHelper = createColumnHelper<{ name: string, age: number }>();

const columns = [
    columnHelper.accessor(row => row.name, {
        id: "name",
        header: "Name",
        filterFn: "complexFilter",
    }),
    columnHelper.accessor(row => row.age, {
        id: "age",
        header: "Age",
        filterFn: "complexFilter"
    })
];

const data = Array.from({length: 100}).map(_ => ({name: "Test", age: Math.round(Math.random() * 100)}));

export default function ClientTable() {
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
    const [sortedFields, setSortedFields] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    return <div className="w-[30rem] h-[30rem]">
        <TableProvider<{name: string, age: number}>
            columns={columns}
            data={data}
            selectionOptions={{
                enabled: true,
                multipleSelection: true,
                selectedRows,
                onRowSelected: setSelectedRows
            }}
            sortingOptions={{
                enabled: true,
                sortedFields,
                onSortingChange: setSortedFields
            }}
            paginationOptions={{
                enabled: true,
                clientSidePagination: true,
                pagination,
                onPaginationChange: setPagination
            }}
            filterOptions={{
                enabled: true
            }}
        >
            <PrimaryTable<{name: string, age: number}> />
        </TableProvider>
    </div>
}