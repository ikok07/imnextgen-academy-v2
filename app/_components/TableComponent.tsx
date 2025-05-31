"use client"

import {
    ColumnFiltersState,
    createColumnHelper,
    flexRender,
    getCoreRowModel, getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    Column,
    useReactTable, Cell
} from "@tanstack/react-table";
import {useMemo, useState} from "react";
import {IoChevronDown, IoChevronUp} from "react-icons/io5";
import {Header, RowData} from "@tanstack/table-core";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/app/_components/ui/shadcn/table";
import {cn} from "@/app/_utils/cn";

declare module "@tanstack/react-table" {
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: "range" | "select"
    }
}

type AgeFilter = {option: string, value: [number, number]};

export default function TableComponent() {
    const columnHelper = createColumnHelper<{name: string, age: number}>();

    const [sorting, setSorting] = useState<SortingState>([{
        id: "age",
        desc: true
    }]);

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const columns = useMemo(() => [
        columnHelper.accessor(row => row.name, {
            id: "name",
            header: "Name",
            enableColumnFilter: false,
            footer: props => props.column.id
        }),
        columnHelper.accessor(row => row.age, {
            id: "age",
            header: "Age",
            meta: {
                filterVariant: "select"
            },
            filterFn: (row, columnId, filterValue: AgeFilter) => {
                return filterValue.value[0] < +(row.getValue(columnId) as string) && filterValue.value[1] > +(row.getValue(columnId) as string)
            },
            // sortingFn: (a, b) => a.original.age - b.original.age,
            footer: props => props.column.id
        }),
    ], []);

    const [data, setData] = useState<{name: string, age: number}[]>(() => [
        {name: "Test1", age: 22},
        {name: "Test2", age: 24},
        {name: "Test3", age: 23},
    ]);

    const table = useReactTable({
        columns,
        columnResizeMode: "onChange",
        columnResizeDirection: "ltr",
        enableColumnResizing: true,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            columnFilters
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters
    });

    const totalTableWidth = useMemo(() => {
        return table.getTotalSize();
    }, [table.getState().columnSizing]);

    function handleFilter(column: Column<{name: string, age: number}>) {
        switch (column.columnDef.meta?.filterVariant) {
            case "select":
                return <select
                    onChange={e => {
                    const selected = e.target.value;
                        switch (selected) {
                            case "under-23":
                                column.setFilterValue({
                                    option: selected,
                                    value: [0, 23]
                                });
                                break;
                            default:
                                column.setFilterValue(undefined);
                        }
                    }}
                    value={(column.getFilterValue() as AgeFilter | undefined)?.option || ""}
                >
                    <option value="">-</option>
                    <option value="under-23">Under 23</option>
                </select>
        }
    }

    return <div
        className="flex flex-col border border-border rounded-sm max-w-full max-h-full overflow-auto"
    >
        <div style={{width: Math.max(totalTableWidth + 10, 100) + "px"}}>
            <div className="overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => {
                            return <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return <TableResizeHeader header={header} />
                                })}
                            </TableRow>
                        })}
                    </TableHeader>
                </Table>
            </div>
        </div>
        <div
            style={{
                width: Math.max(totalTableWidth + 10, 100) + "px",
                overflowY: "auto",
                overflowX: "hidden"
            }}
        >
            <Table>
                <TableBody
                    className="relative w-full"
                >
                    {table.getRowModel().rows.map(row => {
                        return <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell => {
                                return <TableResizeCell cell={cell} />
                            })}
                        </TableRow>
                    })}
                </TableBody>
                <TableCaption>A template table showing the capabilities of TanStack Table</TableCaption>
            </Table>
        </div>
    </div>
}

function TableResizeHeader<TData>({header}: {header: Header<TData, unknown>}) {
    const resizeHandler = header.getResizeHandler();

    return <TableHead
        key={header.id}
        colSpan={header.colSpan}
        rowSpan={header.rowSpan}
        style={{width: `${header.getSize()}px`}}
        onClick={header.column.getToggleSortingHandler()}
        className={cn("relative")}
    >
        <div className="flex items-center gap-1">
            {flexRender(header.column.columnDef.header, header.getContext())}
            {{asc: <IoChevronDown />, desc: <IoChevronUp />}[header.column.getIsSorted() as string] ?? <span>-</span>}
        </div>
        <div
            onDoubleClick={() => header.column.resetSize()}
            onTouchStart={resizeHandler}
            onMouseDown={resizeHandler}
            className={`cursor-col-resize absolute right-0 top-0 h-full w-[5px] hover:bg-cta/20 transition-all duration-200 ${header.column.getIsResizing() ? "bg-primary/30" : ""}`}
        />
    </TableHead>
}

function TableResizeCell<TData>({cell}: {cell: Cell<TData, unknown>}) {
    return <TableCell
        key={cell.id}
        style={{width: cell.column.getSize(), flex: `0 0 ${cell.column.getSize()}px`}}
    >
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
}