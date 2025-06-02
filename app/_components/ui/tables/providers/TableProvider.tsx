"use client"

import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState} from "react";
import {
    AccessorFnColumnDef, AccessorKeyColumnDef, ColumnDef, createColumnHelper, DisplayColumnDef, getCoreRowModel,
    GroupColumnDef, RowSelectionState, Table, useReactTable
} from "@tanstack/react-table";
import PrimaryCheckbox from "@/app/_components/ui/checkboxes/PrimaryCheckbox";

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
    selectionOptions?: {enabled: boolean, multipleSelection?: boolean}
}

const TableContext = createContext<TableState<any> | null>(null);

type SelectionDisabledOptions = {enabled: false, multipleSelection?: undefined, selectedRows?: undefined, onRowSelected?: undefined}
type SelectionEnabledOptions = {enabled: true, multipleSelection?: boolean, selectedRows: RowSelectionState, onRowSelected: Dispatch<SetStateAction<RowSelectionState>>}

type SelectionOptions = SelectionDisabledOptions | SelectionEnabledOptions;

type TableProviderProps<TData> = {
    children: ReactNode,
    initialColumns: AnyColumnDef<TData>[],
    initialData: TData[],
    selectionOptions?: SelectionOptions
}

export default function TableProvider<TData>({children, initialColumns, initialData, selectionOptions}: TableProviderProps<TData>) {
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
        enableMultiRowSelection: selectionOptions?.multipleSelection,
        state: {
          rowSelection: selectionOptions?.selectedRows
        },
        onRowSelectionChange: selectionOptions?.onRowSelected,
        columnResizeMode: "onChange",
        columnResizeDirection: "ltr"
    });

    return <TableContext.Provider value={{
        table,
        columns,
        data,
        setColumns,
        setData,
        selectionOptions
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