"use client"

import {Table, TableBody, TableHeader, TableRow} from "@/app/_components/ui/shadcn/table";
import TableResizeHead from "@/app/_components/ui/tables/primary/TableResizeHead";
import TableResizeCell from "@/app/_components/ui/tables/primary/TableResizeCell";
import {useMemo, useRef} from "react";
import {useTable} from "@/app/_components/ui/tables/provider/TableProvider";
import {cn} from "@/app/_utils/cn";
import PrimaryTableFilterSelector from "@/app/_components/ui/tables/primary/filters/PrimaryTableFilterSelector";
import PrimaryTablePageSelector from "@/app/_components/ui/tables/primary/pagination/PrimaryTablePageSelector";

export default function PrimaryTable<TData>() {
    const {table, filterOptions, paginationOptions} = useTable<TData>();

    const totalTableWidth = useMemo(() => {
        return Math.max(table.getTotalSize() + 10, 200);
    }, [table.getState().columnSizing]);

    return <div className="grid space-y-3">
        <div>
            {filterOptions?.enabled && <PrimaryTableFilterSelector />}
        </div>
        <div className="max-w-full overflow-auto border border-border rounded-lg">
            <div style={{width: "100%", minWidth: `${totalTableWidth}px`}}>
                <div className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map(headerGroup => {
                                return <TableRow key={headerGroup.id} className="hover:bg-background dark:hover:bg-background">
                                    {headerGroup.headers.map(header => {
                                        return <TableResizeHead header={header}/>
                                    })}
                                </TableRow>
                            })}
                        </TableHeader>
                    </Table>
                </div>
            </div>
            <div
                style={{width: "100%", minWidth: `${totalTableWidth}px`}}
                className="overflow-x-hidden overflow-y-auto"
            >
                <Table>
                    <TableBody>
                        {table.getRowModel().rows.map(row => {
                            return <TableRow key={row.id} className={cn(
                                "border-t border-border",
                                {
                                    "bg-cta/20 hover:bg-cta/30": row.getIsSelected()
                                }
                            )}>
                                {row.getVisibleCells().map(cell => {
                                    return <TableResizeCell cell={cell} />
                                })}
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
        <div className="w-full grid">
            {paginationOptions?.enabled && <div className="justify-self-end"><PrimaryTablePageSelector /></div>}
        </div>
    </div>
}