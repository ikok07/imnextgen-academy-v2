"use client"

import {useTable} from "@/app/_components/ui/tables/provider/TableProvider";
import {ReactNode, useMemo} from "react";
import {flexRender} from "@tanstack/react-table";
import {HeaderContext} from "@tanstack/table-core";
import {getFilterOptionLabel} from "@/app/_components/ui/tables/utils/filter-option-labels";
import {IoAdd, IoClose} from "react-icons/io5";
import {FilterRow, FilterValue} from "@/app/_components/ui/tables/primary/filters/PrimaryTableFilterSelector";

function RowColumnField({children}: {children: ReactNode}) {
    return <div className="bg-background border border-border text-xs rounded-md px-3 h-7 flex items-center text-primary/70">{children}</div>
}

export default function PrimaryFilterRow<TData>({filterRow}: {filterRow: FilterRow}) {
    const {table, setRefreshAddRow} = useTable<TData>();

    const column = useMemo(() => table.getColumn(filterRow.id), [filterRow.id]);

    function removeFilter() {
        const tableFilter = {...table.getState().columnFilters.find(f => f.id === filterRow.id)!};
        const hasMultipleOptions = Object.keys(tableFilter.value as object).length > 1;

        if (hasMultipleOptions) delete (tableFilter.value as FilterValue)[filterRow.option];

        table.setColumnFilters(state => hasMultipleOptions ? state.filter(f => f.id != filterRow.id).concat(tableFilter) : state.filter(f => f.id != filterRow.id))
        setRefreshAddRow(v => !v)
    }

    return <div className="grid items-center grid-cols-[2fr_0.5fr_1.5fr_auto] gap-1">
        <RowColumnField>{flexRender(column?.columnDef.header, {} as HeaderContext<any, unknown>)}</RowColumnField>
        <RowColumnField>{getFilterOptionLabel(filterRow.option).short}</RowColumnField>
        <RowColumnField>{filterRow.value}</RowColumnField>
        <button className="hover:opacity-70 transition-all duration-200" onClick={removeFilter}><IoClose className="bg-red-500 text-white w-full h-full rounded-sm text-lg" /></button>
    </div>
}