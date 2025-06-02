"use client"

import {Table, TableBody, TableHeader, TableRow} from "@/app/_components/ui/shadcn/table";
import TableResizeHead from "@/app/_components/ui/tables/primary/TableResizeHead";
import TableResizeCell from "@/app/_components/ui/tables/primary/TableResizeCell";
import {useMemo} from "react";
import {useTable} from "@/app/_components/ui/tables/providers/TableProvider";
import {cn} from "@/app/_utils/cn";

export default function PrimaryTable<TData>() {
    const {table} = useTable<TData>();

    const totalTableWidth = useMemo(() => {
        return Math.max(table.getTotalSize() + 10, 200);
    }, [table.getState().columnSizing]);

    return <div className="max-w-max overflow-auto border border-border rounded-lg">
        <div style={{width: `${totalTableWidth}px`}}>
            <div className="overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => {
                            return <TableRow key={headerGroup.id}>
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
            style={{width: `${totalTableWidth}px`}}
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
}