"use client"

import {Table, TableBody, TableHeader, TableRow} from "@/app/_components/ui/shadcn/table";
import TableResizeHead from "@/app/_components/ui/tables/primary/TableResizeHead";
import TableResizeCell from "@/app/_components/ui/tables/primary/TableResizeCell";
import {useMemo, useRef} from "react";
import {useTable} from "@/app/_components/ui/tables/provider/TableProvider";
import {cn} from "@/app/_utils/cn";
import PrimaryTableFilterSelector from "@/app/_components/ui/tables/primary/filters/PrimaryTableFilterSelector";
import PrimaryTablePageSelector from "@/app/_components/ui/tables/primary/pagination/PrimaryTablePageSelector";
import {useVirtualizer} from "@tanstack/react-virtual";
import PrimaryTableBodySkeleton from "@/app/_components/ui/tables/primary/PrimaryTableBodySkeleton";
import PrimarySelectionOptionsDropdown
    from "@/app/_components/ui/tables/primary/selection-options/PrimarySelectionOptionsDropdown";
import PrimaryLoader from "@/app/_components/ui/loaders/PrimaryLoader";
import PrimaryTableEmpty from "./PrimaryTableEmpty";

type PrimaryTableProps = {
    isLoading?: boolean,
    isRefetching?: boolean,
    rowSize?: number
}

export default function PrimaryTable<TData>({isLoading, isRefetching, rowSize}: PrimaryTableProps) {
    const {table, filterOptions, paginationOptions, selectionOptions} = useTable<TData>();
    const bodyWrapperRef = useRef<HTMLDivElement>(null);
    const rowVirtualizer = useVirtualizer({
        count: table.getRowModel().rows.length,
        getScrollElement: () => bodyWrapperRef.current,
        estimateSize: () => rowSize ?? 37,
        overscan: 10
    });
    const virtualRows = rowVirtualizer.getVirtualItems();

    const totalTableWidth = useMemo(() => {
        return Math.max(table.getTotalSize() + 10, 200);
    }, [table.getState().columnSizing]);

    return <div className="grid grid-rows-[auto_1fr] space-y-3 w-full max-w-max h-full">
        {!isLoading && <div className="flex items-center justify-between">
            {filterOptions?.enabled && <PrimaryTableFilterSelector/>}
            <div className="flex items-center gap-3">
                {isRefetching && <PrimaryLoader className="w-5 aspect-square"/>}
                <PrimarySelectionOptionsDropdown/>
            </div>
        </div>}
        <div className="grid grid-rows-[auto_1fr] overflow-auto border border-border rounded-lg">
            <div style={{width: `${totalTableWidth}px`}}>
                <div className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map(headerGroup => {
                                return <TableRow key={headerGroup.id} className="hover:bg-background dark:hover:bg-background">
                                    {headerGroup.headers.map(header => {
                                        return <TableResizeHead header={header} key={header.id} />
                                    })}
                                </TableRow>
                            })}
                        </TableHeader>
                    </Table>
                </div>
            </div>
            <div
                style={{width: `${totalTableWidth}px`}}
                className="grid overflow-auto"
                ref={bodyWrapperRef}
            >
                <Table>
                    <TableBody className="relative w-full h-full" style={{height: `${rowVirtualizer.getTotalSize()}px`}}>
                        {isLoading ?
                            Array.from({length: 10}).map((_, index) => <PrimaryTableBodySkeleton columns={table.getAllColumns()} key={index} />) :

                            virtualRows.length === 0 ? <PrimaryTableEmpty /> :

                            virtualRows.map(item => {
                                const row = table.getRowModel().rows[item.index];
                                return <TableRow
                                    key={item.key}
                                    className={cn(
                                        "absolute top-0 left-0 w-full flex items-center border-t border-border",
                                        {
                                            "bg-cta/20 hover:bg-cta/30": row.getIsSelected()
                                        }
                                    )}
                                    style={{height: `${item.size}px`, transform: `translateY(${item.start}px)`}}
                                >
                                    {row.getVisibleCells().map(cell => {
                                        return <TableResizeCell cell={cell} key={cell.id} />
                                    })}
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>

            </div>
        </div>
        <div className="w-full grid">
            {paginationOptions?.enabled && <div className="justify-self-end"><PrimaryTablePageSelector /></div>}
        </div>
    </div>
}