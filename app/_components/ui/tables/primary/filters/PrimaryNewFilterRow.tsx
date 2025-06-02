import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/app/_components/ui/shadcn/select";
import {Column, ColumnDef, flexRender, Table} from "@tanstack/react-table";
import {HeaderContext} from "@tanstack/table-core";
import {getFilterOptionLabel} from "@/app/_components/ui/tables/utils/filter-option-labels";
import {SUPPORTED_TABLE_FILTERS} from "@/app/_components/ui/tables/utils/filter-methods";
import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import {IoAdd} from "react-icons/io5";
import {FilterOption, FilterValue} from "@/app/_components/ui/tables/primary/filters/PrimaryTableFilterSelector";
import {useTable} from "@/app/_components/ui/tables/provider/TableProvider";
import {ChangeEvent, useEffect, useMemo, useState} from "react";

function getUnusedFilterOptions(table: Table<any>, selectedFilterColumnId: string) {
    return Object.keys(SUPPORTED_TABLE_FILTERS)
        .filter(option => {
            return !table
                .getState()
                .columnFilters
                .some(f => {
                    return  f.id === selectedFilterColumnId &&
                        !!(f.value as FilterValue)[option as FilterOption]
                })
        })
}

function getBaseAvailableColumnIdsPredicate(table: Table<any>, column: Column<any>) {
    return column.columnDef?.filterFn && column.columnDef.filterFn === "complexFilter" && !table.getState().columnFilters.some(f => column.id === f.id && Object.keys(f.value as FilterValue).length === Object.keys(SUPPORTED_TABLE_FILTERS).length)
}

export default function PrimaryNewFilterRow<TData>() {
    const {table, refreshAddRow, setRefreshAddRow} = useTable<TData>();

    const allColumns = useMemo(() => table.getAllColumns(), []);
    const firstFilterableColumn = useMemo(() => allColumns.find(c => c.getCanSort() && getBaseAvailableColumnIdsPredicate(table, c)), [refreshAddRow]);

    if (!firstFilterableColumn) return; // TODO

    const [selectedFilterColumnId, setSelectedFilterColumnId] = useState<string>(firstFilterableColumn.id);

    const availableColumnIds = useMemo(() => allColumns.filter(c => getBaseAvailableColumnIdsPredicate(table, c)), [refreshAddRow])

    const unusedFilterOptions = useMemo(() => getUnusedFilterOptions(table, selectedFilterColumnId), [selectedFilterColumnId, refreshAddRow]);

    const [selectedFilterOption, setSelectedFilterOption] = useState<FilterOption>(unusedFilterOptions[0] as FilterOption);
    const [value, setValue] = useState<string>("");

    function addFilter() {
        if (!value) return;
        table.setColumnFilters(state => {
            const tableFilter = state.find(filter => filter.id === selectedFilterColumnId);
            if (tableFilter) {
                (tableFilter.value as FilterValue)[selectedFilterOption] = value;
                return state.filter(f => f.id !== tableFilter.id).concat(tableFilter);
            }
            return state.concat({id: selectedFilterColumnId, value: {[selectedFilterOption]: value}});
        });
        setRefreshAddRow(v => !v);
    }

    useEffect(() => {
        setSelectedFilterColumnId(firstFilterableColumn.id);
        setSelectedFilterOption(getUnusedFilterOptions(table, firstFilterableColumn.id)[0] as FilterOption)
        setValue("");
    }, [refreshAddRow]);

    return <div className="grid items-center grid-cols-[2fr_4rem_1.5fr_auto] gap-1">
        <Select defaultValue={selectedFilterColumnId} onValueChange={value => setSelectedFilterColumnId(value)}>
            <SelectTrigger className="text-xs h-7">
                <SelectValue placeholder="Колона">{flexRender(table.getColumn(selectedFilterColumnId)?.columnDef?.header, {} as HeaderContext<any, unknown>)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
                {availableColumnIds.filter(c => c.getCanSort()).map((column, index) => {
                    return <SelectItem value={column.id} key={index}>{column.columnDef.header as string}</SelectItem>
                })}
            </SelectContent>
        </Select>
        <Select value={selectedFilterOption} onValueChange={(value) => {
            setSelectedFilterOption(value as FilterOption);
        }}>
            <SelectTrigger className="text-xs w-[4rem] py-0 h-7">
                <SelectValue>{getFilterOptionLabel(selectedFilterOption).short}</SelectValue>
            </SelectTrigger>
            <SelectContent>
                {unusedFilterOptions.map((filterOption, index) => {
                    const filterOptionLabel = getFilterOptionLabel(filterOption as FilterOption);
                    return <SelectItem
                        value={filterOptionLabel.id}
                        key={index}
                    >
                        {filterOptionLabel.full}
                    </SelectItem>
                })}
            </SelectContent>
        </Select>
        <PrimaryInput value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} placeholder="Стойност" className="!text-xs py-0 h-7"/>
        <button disabled={!value} className="disabled:cursor-not-allowed hover:opacity-70 transition-all duration-200" onClick={addFilter}><IoAdd className={`${!value ? "bg-border" : "bg-cta dark:bg-primary dark:text-background"}  text-white w-full h-full rounded-sm text-lg transition-all duration-200`} /></button>
    </div>
}