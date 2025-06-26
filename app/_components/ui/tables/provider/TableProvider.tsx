"use client"

import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState} from "react";
import {
    AccessorFnColumnDef,
    AccessorKeyColumnDef,
    ColumnDef,
    createColumnHelper,
    DisplayColumnDef,
    getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
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
import {FilterOptions} from "@/app/_components/ui/tables/provider/filter-options";
import {PaginationOptions} from "@/app/_components/ui/tables/provider/pagination-options";

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
    data: TData[],
    refreshAddRow: boolean,
    setRefreshAddRow: Dispatch<SetStateAction<boolean>>,
    selectionOptions?: SelectionOptions,
    sortingOptions?: SortingOptions,
    filterOptions?: FilterOptions,
    paginationOptions?: PaginationOptions
}

const TableContext = createContext<TableState<any> | null>(null);

type TableProviderProps<TData> = {
    children: ReactNode,
    columns: AnyColumnDef<TData>[],
    data: TData[],
    selectionOptions?: SelectionOptions,
    sortingOptions?: SortingOptions,
    filterOptions?: FilterOptions,
    paginationOptions?: PaginationOptions
}

export default function TableProvider<TData>(
    {
        children,
        columns,
        data,
        selectionOptions,
        sortingOptions,
        filterOptions,
        paginationOptions
    }: TableProviderProps<TData>
) {
    const [refreshAddRow, setRefreshAddRow] = useState(false);
    const columnHelper = useMemo(createColumnHelper<TData>, []);

    const modifiedColumns = useMemo(() => {
        let newColumns = columns;
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
        getPaginationRowModel: paginationOptions?.enabled ? getPaginationRowModel() : undefined,
        enableMultiRowSelection: selectionOptions?.multipleSelection,
        state: {
            rowSelection: selectionOptions?.selectedRows,
            sorting: sortingOptions?.enabled ? sortingOptions.sortedFields : undefined,
            pagination: paginationOptions?.enabled ? paginationOptions.pagination : undefined
        },
        onRowSelectionChange: selectionOptions?.onRowSelected,
        onSortingChange: sortingOptions?.enabled ? sortingOptions.onSortingChange : undefined,
        onPaginationChange: paginationOptions?.enabled ? paginationOptions.onPaginationChange : undefined,
        filterFns: {
            complexFilter
        },
        columnResizeMode: "onChange",
        columnResizeDirection: "ltr"
    });

    return <TableContext.Provider value={{
        table,
        columns: modifiedColumns,
        data,
        refreshAddRow,
        setRefreshAddRow,
        selectionOptions,
        sortingOptions,
        filterOptions,
        paginationOptions
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