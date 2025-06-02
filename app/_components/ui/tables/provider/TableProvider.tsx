"use client"

import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState} from "react";
import {
    AccessorFnColumnDef,
    AccessorKeyColumnDef,
    ColumnDef,
    createColumnHelper,
    DisplayColumnDef,
    getCoreRowModel, getFilteredRowModel,
    getSortedRowModel,
    GroupColumnDef,
    Table,
    useReactTable
} from "@tanstack/react-table";
import PrimaryCheckbox from "@/app/_components/ui/checkboxes/PrimaryCheckbox";
import { SelectionOptions } from "./selection-options";
import {SortingOptions} from "@/app/_components/ui/tables/provider/sorting-options";
import {
    complexFilter,
} from "@/app/_components/ui/tables/utils/filter-methods";
import {ColumnFilter} from "@tanstack/table-core";
import {FilterOptions} from "@/app/_components/ui/tables/provider/filter-options";

declare module "@tanstack/react-table" {
    interface FilterFns {
        complexFilter: keyof typeof complexFilter
    }
}

export type AnyColumnDef<TData> =
    | ColumnDef<TData, any>
    | AccessorFnColumnDef<TData, any>
    | AccessorKeyColumnDef<TData, any>
    | DisplayColumnDef<TData, any>
    | GroupColumnDef<TData, any>;

export type TableState<TData> = {
    table: Table<TData>,
    columns: AnyColumnDef<TData>[],
    setColumns: Dispatch<SetStateAction<ColumnDef<TData>[]>>,
    data: TData[],
    setData: Dispatch<SetStateAction<TData[]>>,
    refreshAddRow: boolean,
    setRefreshAddRow: Dispatch<SetStateAction<boolean>>,
    selectionOptions?: SelectionOptions,
    sortingOptions?: SortingOptions,
    filterOptions?: FilterOptions,
}

const TableContext = createContext<TableState<any> | null>(null);

type TableProviderProps<TData> = {
    children: ReactNode,
    initialColumns: AnyColumnDef<TData>[],
    initialData: TData[],
    selectionOptions?: SelectionOptions,
    sortingOptions?: SortingOptions,
    filterOptions?: FilterOptions
}

export default function TableProvider<TData>(
    {
        children,
        initialColumns,
        initialData,
        selectionOptions,
        sortingOptions,
        filterOptions
    }: TableProviderProps<TData>
) {
    const [refreshAddRow, setRefreshAddRow] = useState(false);
    const columnHelper = useMemo(createColumnHelper<TData>, []);

    const [columns, setColumns] = useState<AnyColumnDef<TData>[]>(initialColumns);
    const [data, setData] = useState<TData[]>(initialData);

    const modifiedColumns = useMemo(() => {
        let newColumns = initialColumns;
        if (selectionOptions?.enabled) {
            newColumns = [columnHelper.display({
                id: "selected",
                header: ({table}) => selectionOptions.multipleSelection ? <PrimaryCheckbox
                    checked={table.getIsAllRowsSelected()}
                    onClick={table.getToggleAllRowsSelectedHandler()}
                /> : undefined,
                cell: ({row}) => <PrimaryCheckbox
                    checked={row.getIsSelected()}
                    onClick={row.getToggleSelectedHandler()}
                />,
                size: 40
            }), ...newColumns];
        }
        return newColumns;
    }, [selectionOptions?.enabled]);

    const table = useReactTable({
        columns: modifiedColumns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: sortingOptions?.enabled ? getSortedRowModel() : undefined,
        getFilteredRowModel: filterOptions?.enabled ? getFilteredRowModel() : undefined,
        enableMultiRowSelection: selectionOptions?.multipleSelection,
        state: {
            rowSelection: selectionOptions?.selectedRows,
            sorting: sortingOptions?.enabled ? sortingOptions.sortedFields : undefined,
        },
        filterFns: {
            complexFilter
        },
        onRowSelectionChange: selectionOptions?.onRowSelected,
        onSortingChange: sortingOptions?.enabled ? sortingOptions.onSortingChange : undefined,
        columnResizeMode: "onChange",
        columnResizeDirection: "ltr"
    });

    return <TableContext.Provider value={{
        table,
        columns,
        data,
        setColumns,
        setData,
        refreshAddRow,
        setRefreshAddRow,
        selectionOptions,
        sortingOptions,
        filterOptions
    } as TableState<TData>}>
        {children}
    </TableContext.Provider>
}

export function useTable<TData>() {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error("useTable must be used inside TableProvider!");
    }
    return context as TableState<TData | any>;
}