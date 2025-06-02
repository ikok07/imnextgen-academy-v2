"use client"

import PrimaryTable from "@/app/_components/ui/tables/primary/PrimaryTable";
import TableProvider from "@/app/_components/ui/tables/provider/TableProvider";
import {createColumnHelper, RowSelectionState, SortingState} from "@tanstack/react-table";
import {useState} from "react";


const columnHelper = createColumnHelper<{name: string, age: number}>();

const columns = [
    columnHelper.accessor(row => row.name, {
        id: "name",
        header: "Name",
        filterFn: "complexFilter"
    }),
    columnHelper.accessor(row => row.age, {
        id: "age",
        header: "Age",
        filterFn: "complexFilter"
    })
];

const data = [{name: "Test1", age: 20}, {name: "Test2", age: 30},]

export default function ClientTable() {
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
    const [sortedFields, setSortedFields] = useState<SortingState>([]);

    return <TableProvider<{name: string, age: number}>
        initialColumns={columns}
        initialData={data}
        selectionOptions={{
            enabled: true,
            multipleSelection: true,
            selectedRows,
            onRowSelected: setSelectedRows
        }}
        sortingOptions={{
            enabled: true,
            sortedFields: sortedFields,
            onSortingChange: setSortedFields
        }}
        filterOptions={{
            enabled: true
        }}
    >
        <PrimaryTable<{name: string, age: number}> />
    </TableProvider>
}