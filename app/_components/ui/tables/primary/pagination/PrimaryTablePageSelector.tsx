"use client"

import {
    Pagination,
    PaginationContent,
    PaginationItem, PaginationNext,
    PaginationPrevious
} from "@/app/_components/ui/shadcn/pagination";
import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import {useTable} from "@/app/_components/ui/tables/provider/TableProvider";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export default function PrimaryTablePageSelector() {
    const {table} = useTable();

    const [pageSize, setPageSize] = useState(table.getState().pagination.pageSize);

    function setSize() {
        table.setPageSize(pageSize);
    }

    return <Pagination>
        <PaginationContent className="flex items-center justify-center flex-wrap">
            <PaginationItem>
                <div className="flex items-center gap-2">
                    <small>Брой редове</small>
                    <PrimaryInput
                        value={pageSize}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPageSize(isNaN(+e.target.value) ? 0 : +e.target.value)}
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" ? setSize() : () => {}}
                        onBlur={setSize}
                        placeholder="10"
                        className="w-10 h-8 !text-sm"
                    />
                </div>
            </PaginationItem>
            <PaginationContent className="mx-3">
                <small>{table.getState().pagination.pageIndex + 1} от {table.getPageCount()}</small>
            </PaginationContent>
            <PaginationItem className="flex items-center justify-center gap-1">
                <PaginationPrevious onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()} toStart={true} />
                <PaginationPrevious onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}/>
                <PaginationNext onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}/>
                <PaginationNext onClick={() => table.lastPage()} disabled={!table.getCanNextPage()} toEnd={true} />
            </PaginationItem>
        </PaginationContent>
    </Pagination>
}